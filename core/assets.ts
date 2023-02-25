import fetchFile from '../utils/fetchFile';
import decryptFile from './decryptFile';
import hashFileName from './hashFileName';
import unGzip from '../lib/gzip';
import { URL_PREFIX } from '../settings';

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
  public isEncrypted;
  public ext: string;
  private url: URL;
  constructor(public name: string) {
    this.ext = name.split('.').length === 1 ? '' : name.split('.').pop()!;
    this.isEncrypted = this.ext === 'json' || this.ext === 'atlas' ? true : false;
    this.url = new URL(URL_PREFIX + hashFileName(name));
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
  fixUrl(url: URL) {
    //应对特殊情况
    this.url = url;
  }
}
