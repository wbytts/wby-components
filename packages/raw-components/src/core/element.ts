export * from '../types/HTMLAttributes';

type Prop = string | number | boolean;

const parseType = (value: unknown, old: Prop) => {
  if (value === undefined) return old;
  if (typeof old === 'string') return String(value);
  if (typeof old === 'number') return Number(value);
  if (typeof old === 'boolean') {
    if (typeof value === 'boolean') return value;
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

type Setup<P, E> = (
  this: P & HTMLElement,
  shadowRoot: ShadowRoot
) => {
  mounted?: () => void;
  unmounted?: () => void;
  adopted?: () => unknown;
  watches?: {
    [K in keyof P]?: (value: P[K]) => void;
  };
  expose?: E;
} | void;

export const useElement = <P extends { [key: string]: Prop } = {}, E extends {} = {}>(options: {
  style?: string;
  props?: P;
  syncProps?: (keyof P)[] | true;
  template?: string;
  setup?: Setup<P, E>;
}): {
  new (): P & E & HTMLElement;
  readonly define: (name: string) => void;
  prototype: HTMLElement;
} => {
  // 初始化样式表
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(options.style ?? '');

  // 初始化属性
  const attrs: string[] = [];
  const upperAttrs: { [key: string]: string } = {};
  for (const key in options.props) {
    const value = key.toLowerCase();
    attrs.push(value);
    upperAttrs[value] = key;
  }
  const map = new Map<HTMLElement, ReturnType<Setup<P, E>>>();

  /**
   * 自定义元素类
   */
  class CustomComponent extends HTMLElement {
    static observedAttributes = attrs;

    /**
     * 注册自定义元素
     * @param name 自定义元素的名称
     */
    static define(name: string) {
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
      const setups = options.setup?.apply(this as any, [shadowRoot]);
      for (const key in options.props) {
        Object.defineProperty(this, key, {
          get: () => props[key],
          set: v => {
            const value = parseType(v, options.props![key]);
            if (value === props[key]) return;
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
            setups?.watches?.[key]?.(value as never);
          },
        });
      }
      for (const key in setups?.expose) {
        Object.defineProperty(this, key, {
          get: () => setups?.expose![key as never],
        });
      }
    }


    connectedCallback() {
      map.get(this)?.mounted?.()
    }

    disconnectedCallback() {
      map.get(this)?.unmounted?.()
    }

    adoptedCallback() {
      map.get(this)?.adopted?.()
    }

    /**
     * 元素的属性发生了变化
     * @param key
     * @param _
     * @param newValue
     */
    attributeChangedCallback(key: string, _: unknown, newValue: string | null) {
      // 更新保存的值
      this[upperAttrs[key]] = newValue ?? undefined
    }
  }
  return CustomComponent as never;
};

export type LowercaseKeys<T> = {
  [K in keyof T as K extends string ? Lowercase<K> : never]: T[K]
}
