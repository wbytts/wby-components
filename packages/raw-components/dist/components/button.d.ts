declare const Button_base: {
    new (): HTMLElement;
    readonly define: (name: string) => void;
    prototype: HTMLElement;
};
/**
 * 自定义按钮类
 */
export declare class Button extends Button_base {
}
export {};
