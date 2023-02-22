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
  webp,
  atlas,
}

export default class Asset {
  public buffer: Buffer;
  public data: Buffer | string;
  public isEncrypted;
  private ext: string;
  private url: URL;
  constructor(public name: string) {
    this.ext = name.split('.').length === 1 ? '' : name.split('.').pop()!;
    this.isEncrypted = this.ext === 'json' || this.ext === 'atlas' ? true : false;
    this.buffer = Buffer.alloc(0);
    this.url = new URL(URL_PREFIX + hashFileName(name));
    this.data = this.ext === 'm4a' ? Buffer.alloc(0) : '';
  }
  async fetchFile() {
    console.log('downloading..');
    this.buffer = Buffer.from(await fetchFile(this.url));
  }
  async decodeFile() {
    if (this.isEncrypted) {
      this.buffer = decryptFile(this.buffer);
    }
    let data = await unGzip(this.buffer);
    this.data = this.ext === 'json' || this.ext === 'atlas' ? data.toString() : data;
  }
  fixUrl(url: URL) {
    //应对特殊情况
    this.url = url;
  }
}
