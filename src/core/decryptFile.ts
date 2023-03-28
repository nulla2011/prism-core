import { Buffer } from 'node:buffer';
import KEY from './key';

const KEY_LENGTH = KEY.length;

export default function decryptFile(input: Buffer) {
  let gzBuffer = Buffer.alloc(0);
  for (const [i, v] of input.entries()) {
    gzBuffer = Buffer.concat([gzBuffer, new Uint8Array([v ^ KEY.charCodeAt(i % KEY_LENGTH)])]);
  }
  return gzBuffer;
}
