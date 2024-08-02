export * from '../types/HTMLAttributes';
type Prop = string | number | boolean;
type Setup<P, E> = (this: P & HTMLElement, shadowRoot: ShadowRoot) => {
    mounted?: () => void;
    unmounted?: () => void;
    adopted?: () => unknown;
    watches?: {
        [K in keyof P]?: (value: P[K]) => void;
    };
    expose?: E;
} | void;
export declare const useElement: <P extends {
    [key: string]: Prop;
} = {}, E extends {} = {}>(options: {
    style?: string;
    props?: P;
    syncProps?: (keyof P)[] | true;
    template?: string;
    setup?: Setup<P, E>;
}) => {
    new (): P & E & HTMLElement;
    readonly define: (name: string) => void;
    prototype: HTMLElement;
};
export type LowercaseKeys<T> = {
    [K in keyof T as K extends string ? Lowercase<K> : never]: T[K];
};
