import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import consolePlugin from './src/common/plugins/console-plugin'
import Unocss from 'unocss/vite';
import path from 'path';

// 在 transformIndexHtml 钩子上动态引入打包入口文件
const getEntry = code => code.replace(
  /__ENTRY__/,
  `/src/pages/${process.env.ENTRY_PATH}/main.js`,
);

// pub 时补齐资源链接
// const getBase = () => {
//   if (process.env.A_ENV === 'prod') return `//ugd.gtimg.com/h5/activity/vg_activity/${process.env.ENTRY_PATH}/`;
//   if (process.env.A_ENV === 'pre') return `//ugd.gtimg.com/h5/preactivity/vg_activity/${process.env.ENTRY_PATH}/`;
//   if (process.env.A_ENV === 'test') return `//ugd.gtimg.com/h5/tactivity/vg_activity/${process.env.ENTRY_PATH}/`;
//   return `/${process.env.ENTRY_PATH}/`;
// };

export default defineConfig({
  root: __dirname,
  compilerOptions: {
    target: 'es5',
    module: 'es5',
  },
  plugins: [
    {
      name: 'transform',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.html')) {
          return { code: getEntry(code), map: null };
        }
      },
      transformIndexHtml: getEntry,
    },
    vue(),
    // viteCompression(),

   
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // 自动导入组件
    Components({
      dirs: ['src/components', 'src/pages'],
      resolvers: [
        ElementPlusResolver(), 
      ],
      dts: 'src/components.d.ts', // 自定义生成.d.ts位置
    }),
    Unocss({}),
    consolePlugin({
       preTip:'😈😈😈'
    }),

  ],
  // base: `/${process.env.ENTRY_PATH}/`,
  build: {
    rollupOptions: {
      // external: ['__ENTRY__'],
      output: {
        // 最小化拆分包
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
  publicPath: './',
  define: {
    // 'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
  },
  resolve: {
    alias: [
      { find: '@common', replacement: path.resolve(__dirname, '/src/common') },
      { find: '@pages', replacement: path.resolve(__dirname, '/src/pages') },
      { find: '@logger', replacement: path.resolve(__dirname, '/src/common/logger/index') },


    ],
  },
  optimizeDeps: {
    exclude: ['__ENTRY__'], // 排除 __ENTRY__
  },
  server: {
    port: 8080,
    open: true,
  },
});
