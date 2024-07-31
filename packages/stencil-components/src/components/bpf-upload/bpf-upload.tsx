import { Component, Prop, h, Element, Host, State } from '@stencil/core';
import { destr } from 'destr';
import { getLogger } from '../../utils/utils';
import { uploadFile } from './api';

const log = getLogger("bpf-upload")

@Component({
  tag: 'bpf-upload',
  styleUrl: 'bpf-upload.scss',
  shadow: true,
})
export class BpfUpload {
  @Element() el: HTMLElement;

  /**
   * 文件列表
   */
  files: FileList;

  /**
   * 上传时的附加请求头
   */
  @Prop() headers?: string;

  /**
   * 应用编码
   */
  @Prop() appCode: string;

  /**
   * 业务模块编码（英文字母）
   */
  @Prop() bizModule: string;

  /**
   * 终端来源：1-PC，2-APP
   */
  @Prop() source: string;

  /**
   * 删除文件时，是否可同步删除OSS服务器上的文件：0-否，1-是
   */
  @Prop() ossDelete: string;

  /**
   * 是否多文件上传
   */
  @Prop() multiple: Boolean = false;

  /**
   * 是否允许拖拽
   */
  @Prop() drag: Boolean = false;

  /**
   * 可选的文件类型
   */
  @Prop() accept?: string;

  componentWillLoad() {
    log('请求头信息:', destr(this.headers));
    log('可选文件类型:', this.accept.split('|'))
  }

  componentDidRender() {
    const uploadBtn = this.el.shadowRoot.querySelector('#upload-btn') as HTMLInputElement;
    this.files = uploadBtn.files
  }

  handleFileChange(event) {
    // console.log('handleFileChange', event);
  }

  async handleUploadBtnClick(event) {
    console.log('点击了上传按钮', event);

    const uploadBtn = this.el.shadowRoot.querySelector('#upload-btn') as HTMLInputElement;
    console.dir(uploadBtn);

    uploadBtn.click();
    uploadBtn.addEventListener(
      'change',
      async e => {
        this.files = uploadBtn.files
        console.log('选择了文件', this.files);

        // 进行文件上传
        let formData = new FormData()
        formData.append("appCode", "merchandise-open-server")        
        formData.append("bizModule", "OPEN_SPU")
        formData.append("file", this.files[0])
        formData.append("source", "1") // 终端来源：1-PC，2-APP
        formData.append("ossDelete", "1") // 删除文件时，是否可同步删除OSS服务器上的文件：0-否，1-是
        let res = await uploadFile(formData, destr(this.headers))
        console.log(res)

      },
      { once: true },
    );
  }

  render() {
    return (
      <div class="container">
        <input id="upload-btn" type="file"  onChange={event => this.handleFileChange(event)} style={{ display: 'none' }} />
        <button class="upload-btn" onClick={event => this.handleUploadBtnClick(event)}>
          上传
        </button>
      </div>
    );
  }
}
