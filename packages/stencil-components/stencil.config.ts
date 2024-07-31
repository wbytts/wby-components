import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'zczy-stencil-components',
  outputTargets: [
    {
      type: 'www',
      indexHtml: 'index.html',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-vscode',
      file: 'vscode-data.json',
    },

    // =====================================================================
    // 输出 Loader
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    // 输出自定义元素 WebComponents组件
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false, // 不使用外部运行时
      includeGlobalScripts: false,
    },
    // 输出 Vue3 组件
    // vueOutputTarget({
    //   componentCorePackage: 'zczy-stencil-components',
    //   proxiesFile: '../stencil-vue-library/lib/components.ts',
    // }),
    // 输出 React 组件
    // reactOutputTarget({
    //   componentCorePackage: 'zczy-stencil-components',
    //   proxiesFile: '../stencil-react-library/lib/components/stencil-generated/index.ts',
    // }),
  ],
  testing: {
    browserHeadless: 'new',
  },

  // 插件
  plugins: [sass()],

  devServer: {
    root: 'www', // 提供文件的目录, 默认值: www 输出目录(如果存在)，否则为项目根目录
    address: '0.0.0.0',
    port: 3333,
    logRequests: true, // 默认false, 对服务器的每个请求都会被记录在终端中
    openBrowser: false, // 默认true, 启动开发服务器时，会在默认浏览器中打开本地开发 URL
    initialLoadUrl: '/', // 开发服务器应首先打开的 URL; 默认为 '/'
  }
};
