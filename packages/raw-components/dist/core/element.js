export * from '../types/HTMLAttributes';
const parseType = (value, old) => {
    if (value === undefined)
        return old;
    if (typeof old === 'string')
        return String(value);
    if (typeof old === 'number')
        return Number(value);
    if (typeof old === 'boolean') {
        if (typeof value === 'boolean')
            return value;
        return value === 'true' ? true : false;
    }
    throw new TypeError();
};
const baseStyle = new CSSStyleSheet();
baseStyle.replaceSync(/*css*/ `
  :host {
    user-select: none;
    -webkit-user-select: none;
  }
`);
export const useElement = (options) => {
    // 初始化样式表
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(options.style ?? '');
    // 初始化属性
    const attrs = [];
    const upperAttrs = {};
    for (const key in options.props) {
        const value = key.toLowerCase();
        attrs.push(value);
        upperAttrs[value] = key;
    }
    const map = new Map();
    /**
     * 自定义元素类
     */
    class CustomComponent extends HTMLElement {
        static observedAttributes = attrs;
        /**
         * 注册自定义元素
         * @param name 自定义元素的名称
         */
        static define(name) {
            window.customElements.define(name, this);
        }
        constructor() {
            super();
            // 影子DOM根
            const shadowRoot = this.attachShadow({ mode: 'open' });
            // 设置样式表
            shadowRoot.adoptedStyleSheets = [baseStyle, sheet];
            // 设置模板
            shadowRoot.innerHTML = options.template ?? '';
            // 对属性进行浅拷贝
            const props = { ...options.props };
            const setups = options.setup?.apply(this, [shadowRoot]);
            for (const key in options.props) {
                Object.defineProperty(this, key, {
                    get: () => props[key],
                    set: v => {
                        const value = parseType(v, options.props[key]);
                        if (value === props[key])
                            return;
                        if (options.syncProps === true || options.syncProps?.includes(key)) {
                            const lowerKey = key.toLowerCase();
                            const attrValue = this.getAttribute(lowerKey);
                            const valueStr = String(value);
                            if (value === options.props?.[key] && attrValue !== null) {
                                this.removeAttribute(lowerKey);
                                return;
                            }
                            if (value !== options.props?.[key] && attrValue !== valueStr) {
                                this.setAttribute(lowerKey, valueStr);
                                return;
                            }
                        }
                        props[key] = value;
                        setups?.watches?.[key]?.(value);
                    },
                });
            }
            for (const key in setups?.expose) {
                Object.defineProperty(this, key, {
                    get: () => setups?.expose[key],
                });
            }
        }
        connectedCallback() {
            map.get(this)?.mounted?.();
        }
        disconnectedCallback() {
            map.get(this)?.unmounted?.();
        }
        adoptedCallback() {
            map.get(this)?.adopted?.();
        }
        /**
         * 元素的属性发生了变化
         * @param key
         * @param _
         * @param newValue
         */
        attributeChangedCallback(key, _, newValue) {
            // 更新保存的值
            this[upperAttrs[key]] = newValue ?? undefined;
        }
    }
    return CustomComponent;
};
