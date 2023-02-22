import { createHash } from 'node:crypto';
import path from 'path';

const PREFIX = '/assets/';
export default function hashFileName(filePath: string) {
  const hash = createHash('sha256');
  const name = path.basename(filePath).replace(path.extname(filePath), '');
  hash.update(name[0] + name.at(-1) + PREFIX + filePath);
  return hash.digest('hex');
}
