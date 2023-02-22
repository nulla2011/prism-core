import { createGunzip } from 'node:zlib';
import { Readable, Writable } from 'stream';

export default function unGzip(input: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    let out = Buffer.alloc(0);
    Readable.from([input])
      .pipe(createGunzip())
      .on('error', () => resolve(out)) //结尾 size 不对没法处理
      .on('data', (chunk) => {
        out = Buffer.concat([out, chunk]);
      })
      .on('end', () => {
        console.log('gunzip success');
        resolve(out);
      });
  });
}
