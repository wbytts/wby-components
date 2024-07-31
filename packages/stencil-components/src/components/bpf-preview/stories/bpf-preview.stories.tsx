import { fn } from '@storybook/test';
import type { Meta, StoryObj} from '@storybook/html';
import '/www/build/zczy-stencil-components.esm.js'

type BpfUploadArgs = {
  primary: boolean;
  label: string;
  headers: string;
};
 
const meta: Meta<BpfUploadArgs> = {
  title: 'BPF组件/bpf-preview 文件预览组件',
  render: (args) => {
    const wrapper = document.createElement("div")
    return wrapper
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    headers: `{"ucClientApp": "wms","ucClientType": "PC","from": "wms","ucSystemFlag": "7"}`,
  }
};
 
export default meta;



export const DEFAULT: StoryObj = {
};

