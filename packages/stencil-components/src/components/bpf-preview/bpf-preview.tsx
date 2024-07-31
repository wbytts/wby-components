import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'bpf-preview',
  styleUrl: 'bpf-preview.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * 标题
   */
  @Prop() zcTitle: string;

  render() {
    return (
      <div class="container">
        <div>zcTitle: {this.zcTitle}</div>
      </div>
    );
  }
}
