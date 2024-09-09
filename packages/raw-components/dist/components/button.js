import { useElement } from "../core/element";
import { prefix } from "../config";
const name = `${prefix}-button`;
// 属性
const props = {};
// 样式表
const style = /*css*/ `
`;
// 模板
const template = /*html*/ `
  <div>一个按钮123</div>
`;
/**
 * 自定义按钮类
 */
export class Button extends useElement({ style, template, props, syncProps: true }) {
}
Button.define(name);
