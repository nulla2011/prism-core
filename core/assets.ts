import fetchFile from '../utils/fetchFile';
import decryptFile from './decryptFile';
import hashFileName from './hashFileName';
import unGzip from '../lib/gzip';

export enum fileType {
  json,
  m4a,
  mp4,
  png,
  jpg,
  webp,
  atlas,
}

export default class Asset {
  public data: Buffer | string;
  public isEncrypted: boolean;
  public ext: string;
  private url: string;
  constructor(public name: string) {
    this.ext = name.split('.').length === 1 ? '' : name.split('.').pop()!;
    this.isEncrypted = this.ext === 'json' || this.ext === 'atlas';
    this.url =
      hashFileName(name) + (this.ext === 'mp4' || this.ext === 'm4a' ? '.' + this.ext : '');
    this.data = Buffer.alloc(0);
  }
  async fetchFile() {
    console.log(`downloading ${this.name}`);
    this.data = Buffer.from(await fetchFile(this.url));
  }
  async decodeFile() {
    if (this.isEncrypted) {
      this.data = decryptFile(this.data as Buffer);
    }
    let data = await unGzip(this.data as Buffer);
    this.data = this.ext === 'json' || this.ext === 'atlas' ? data.toString() : data;
  }
  fixUrl(url: string) {
    //应对特殊情况
    this.url = url;
  }
}
