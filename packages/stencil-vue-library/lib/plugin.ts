import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from 'zczy-stencil-components/loader';

export const ZczyStencilComponentsLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};