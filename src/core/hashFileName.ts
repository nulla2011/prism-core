import { createHash } from 'node:crypto';
import path from 'path';

const PREFIX = '/assets/';
export default function hashFileName(filePath: string, hash?: string | null) {
  const hashFileName = createHash('sha256');
  let name = path.basename(filePath).replace(path.extname(filePath), '');
  if (hash) {
    name = hash + '_' + name;
    filePath = filePath.replace(path.basename(filePath), '') + name + path.extname(filePath);
  }
  hashFileName.update(name[0] + name.at(-1) + PREFIX + filePath);
  return hashFileName.digest('hex');
}
