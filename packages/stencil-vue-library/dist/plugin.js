import { applyPolyfills, defineCustomElements } from 'zczy-stencil-components/loader';
export const ZczyStencilComponentsLibrary = {
    async install() {
        applyPolyfills().then(() => {
            defineCustomElements();
        });
    },
};
//# sourceMappingURL=plugin.js.map