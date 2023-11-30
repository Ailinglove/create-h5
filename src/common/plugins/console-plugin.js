import _traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import _generate from '@babel/generator';
import { createFilter } from 'vite';
import { SourceMapConsumer } from 'source-map';
const traverse = _traverse.default;
const generate = _generate.default;

function stringLiteral(value) {
  const stringLiteralNode = {
    type: 'StringLiteral',
    value,
  };
  return stringLiteralNode;
}

function getFilePath(filePath, lineNumber) {
  if (!filePath) return '';
  return `${filePath}:${lineNumber}`;
}


const DEFAULT_PRE_TIP = '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀';
const CONSOLE_FUN = 'console.log';

export default function viteConsolePlugin(options = {}) {
  const {
    preTip = DEFAULT_PRE_TIP,
    endLine: enableEndLine = false,
  } = options;


  let root = '';
  const filter = createFilter(
    [/\.[jt]sx?$/, /\.vue$/],
    [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
  );

  function getPrefix(relativeFilename, lineNumber) {
    return `${preTip} ${relativeFilename ? '' : `line:${lineNumber} `}`;
  }
  
   return {
    name: 'vite-console-plugin',
    enforce: 'post',
    configResolved(config) {
      root = config.root;
    },
    async transform(code, id) {
      if(!filter(id)) return

      const ast = parse(code, {
        sourceType: 'unambiguous',
        sourceFilename: id,
      });

      const rawSourcemap = this.getCombinedSourcemap();
      const consumer = await new SourceMapConsumer(rawSourcemap);

      traverse(ast, {
        CallExpression(path){
          const calleeCode = generate(path.node.callee).code;
          if(calleeCode === CONSOLE_FUN){
            // 获取文件名
            const relativeFilename = id.replace(`${root}/`, '').split('?')[0];
            // 获取loc
            const {line, column} = path.node?.loc?.start;
            const { line: originStartLine } = consumer.originalPositionFor({ line, column }) || {};
            const nodeArgs = path.node.arguments;
            const startLineTipNode = stringLiteral(`${getPrefix(relativeFilename, originStartLine)}${getFilePath(relativeFilename, originStartLine)}\n`);
            nodeArgs.unshift(startLineTipNode)
          }
        }
      })

      const { code: newCode, map } = generate(ast, {
        sourceFileName: id,
        retainLines: true,
        sourceMaps: true,
      });

      return {
        code: newCode,
        map,
      };
    }
  };
}
