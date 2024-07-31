import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/html';
import '/www/build/zczy-stencil-components.esm.js'
import { destr } from "destr";

type BpfUploadArgs = {
  headers: string;
  accept: string;
  appCode: string;
  bizModule: string;
  source: string;
  ossDelete: string;
};
 
const meta: Meta<BpfUploadArgs> = {
  title: 'BPF组件/bpf-upload 文件上传组件',
  render: (args) => {
    const wrapper = document.createElement("div")


    wrapper.innerHTML = /*html*/`
      <bpf-upload
      headers='${args.headers}'
      app-code='${args.appCode}'
      biz-module='${args.bizModule}'
      source='${args.source}'
      oss-delete='${args.ossDelete}'
      accept='${args.accept}'
      ></bpf-upload>
    `

    return wrapper
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    headers: {
      description: "各业务系统上传用的请求头"
    },
    appCode: {
      description: "应用编码"
    },
    bizModule: {
      description: "业务模块编码（英文字母）"
    },
    source: {
      description: "终端来源：1-PC，2-APP"
    },
    ossDelete: {
      description: "删除文件时，是否可同步删除OSS服务器上的文件：0-否，1-是"
    },
    accept: {
      description: '接受的文件类型'
    }
  },
  args: {
    headers: `{"ucClientApp": "wms","ucClientType": "PC","from": "wms","ucSystemFlag": "7", "ucSsoTokenId": "b8ab7988b1744a7eb255cb99b4930f88"}`,
    appCode: 'merchandise-open-server',
    bizModule: 'OPEN_SPU',
    source: '1',
    ossDelete: '1',
    accept: '.jpg|.png|.pdf|.docx'
  }
};
 
export default meta;



export const DEFAULT: StoryObj = {
};

export const 单文件上传: StoryObj = {}

export const 图片上传: StoryObj = {}

export const 批量上传: StoryObj = {}



