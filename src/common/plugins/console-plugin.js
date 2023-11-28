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

export default function exportLogPlugin(options = {}) {
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
    name: 'console-plugin',
    configResolved(config) {
      root = config.root;
    },
    enforce: 'post',
    async transform(code, id) {
      if (!filter(id)) return;
      const rawSourcemap = this.getCombinedSourcemap();

      console.log('sourcemap',rawSourcemap)

      const consumer = await new SourceMapConsumer(rawSourcemap);
      const ast = parse(code, {
        sourceType: 'unambiguous',
        sourceFilename: id,
      });


      traverse(ast, {
        CallExpression(path) {
          const calleeCode = generate(path.node.callee).code;

          if (calleeCode === CONSOLE_FUN) {
            const nodeArgs = path.node.arguments;
            const { loc } = path.node;

            if (loc) {
              const { line, column } = loc.start;
              // 根据originalPositionFor 找到代码中原始的位置
              const { line: originStartLine } = consumer.originalPositionFor({ line, column }) || {};
              const relativeFilename = id.replace(`${root}/`, '').split('?')[0];

              const startLineTipNode = stringLiteral(`${getPrefix(relativeFilename, originStartLine)}${getFilePath(relativeFilename, originStartLine)}\n`);
              nodeArgs.unshift(startLineTipNode);
            }
          }
        },
      });

      const { code: newCode, map } = generate(ast, {
        sourceFileName: id,
        retainLines: true,
        sourceMaps: true,
      });

      return {
        code: newCode,
        map,
      };
    },
  };
}
