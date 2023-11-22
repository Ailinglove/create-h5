import * as babel from '@babel/core';
const { basename } = require('path');
const { addDefault } = require('@babel/helper-module-imports');;

export default function replacePlugin() {
  const { types: t, template } = babel;

  return {
    name: 'test-log',
    
    transform(code, id) {
      console.log('=======shhhhhhhhsss', id);

    },


    visitor: {
      AssignmentExpression(path) {
        const { node, scope } = path;
        console.log(';s;s;s;s;s;s;;s')
        // 只处理 **=
        if (node.operator === `${operator}=`) {
        	// 修改 AST
        }
      },

      BinaryExpression(path) {
        const { node } = path;
        if (node.operator === operator) {
          // 修改 AST
        }
      },
    }
  
  };
};
// module.exports = (babel) => {
//   console.log('===>', babel);
//   const { types: t, template } = babel;
//   return {
//     name: 'test-log',
//     visitor: {
//       CallExpression(path, state) {
//         if (t.isMemberExpression(path.node.callee) // 判断是不是对象成员，比如console.log
//                 && path.node.callee.object.name === 'console'
//                 && ['log', 'info', 'warn', 'error'].includes(path.node.callee.property.name)
//         ) {
//           const filename = basename(state.file.opts.filename); // 获取文件名 比如index.js
//           const location = `${filename} ${path.node.loc.start.line}:${path.node.loc.start.column}`; // 获取console调用位置 比如7:8

//           const programPath = path.hub.file.path;
//           let importTrackerId = '';
//           programPath.traverse({
//             // 解析当前文件import
//             ImportDeclaration(path) {
//               const sourceValue = path.get('source').node.value;
//               if (sourceValue === '@logger') { // 判断是否有引用@logger
//                 const specifiers = path.get('specifiers.0');
//                 // 如果当前文件有引用@logger，记录import的变量名存在importTrackerId
//                 importTrackerId = specifiers.get('local').toString();
//                 path.stop();
//               }
//             },
//           });

//           if (!importTrackerId) {
//             // 如果当前文件没有引用@logger，则需要添加一个 import _loggerXX from '@logger'，并且记录变量名存在importTrackerId
//             importTrackerId = addDefault(programPath, '@logger', {
//               nameHint: programPath.scope.generateUid('_logger'), // 会生成一个随机变量名，比如_logger2
//             }).name;
//           }
//           const window = t.identifier(importTrackerId); // 生成 _logger
//           const my_console = t.memberExpression(window, t.identifier('log')); // 生成 _logger.log
//           const args = [t.stringLiteral(path.node.callee.property.name), t.stringLiteral(location), ...path.node.arguments]; // 定义参数："log", "index.js 7:8", ...args
//           const expression = t.callExpression(my_console, args); // 把参数传入方法中 _logger.log(method, location, ...args)
//           console.log('替换logger啊');
//           path.replaceWith(expression); // 替换当前console语法
//         }
//       },
//     },
//     presets: ['@babel/preset-env'],
//     overrides: [
//       {
//         include: './node_modules/*', // 使用的第三方库
//         sourceType: 'unambiguous',
//       },
//     ],
//     plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-optional-chaining'],
//   };
// };
