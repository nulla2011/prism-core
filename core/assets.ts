import fetchFile from '../utils/fetchFile';
import decryptFile from './decryptFile';
import hashFileName from './hashFileName';
import unGzip from '../lib/gzip';
import findHash from '../utils/findHash';
import path from 'node:path';

export const HASHED_PREFIX = {
  'images/content/idols/': 'idols',
  'movies/idols/': 'idols',
  'images/content/support_idols/': 'supportIdols',
  'sounds/concert_music/': 'music',
  'movies/music_video/': 'music',
  'images/content/comics/': 'comics',
} as const;
export type prefixKeys = keyof typeof HASHED_PREFIX;
type hashResourceTypes = typeof HASHED_PREFIX[prefixKeys];

export enum fileType {
  json,
  m4a,
  mp4,
  png,
  jpg,
  atlas,
}
export default class Asset {
  public data: Buffer | string;
  public isEncrypted: boolean;
  public hash: string | null;
  public ext: fileType;
  public url: string;
  constructor(public name: string) {
    this.name = name;
    this.ext = fileType[name.split('.').pop()! as keyof typeof fileType];
    this.isEncrypted = this.ext === fileType.json || this.ext === fileType.atlas;
    this.data = Buffer.alloc(0);
    this.hash = null;
    this.url = '';
  }
  getUrl() {
    for (const key in HASHED_PREFIX) {
      if (this.name.startsWith(key)) {
        let fileName = path.basename(this.name).replace(path.extname(this.name), '');
        this.hash = findHash(fileName, HASHED_PREFIX[key as prefixKeys]);
        break;
      }
    }
    this.url =
      hashFileName(this.name, this.hash) +
      (this.ext === fileType.mp4 || this.ext === fileType.m4a ? '.' + fileType[this.ext] : '');
    return this.url;
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
    this.data = this.ext === fileType.json || this.ext === fileType.atlas ? data.toString() : data;
  }
  fixUrl(url: string) {
    //应对特殊情况
    this.url = url;
  }
}
