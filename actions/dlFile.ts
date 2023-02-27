import Asset from '../core/assets';
import { writeFile } from 'fs';
import path from 'path';
import { SAVE_PATH } from '../settings';
import { replaceSlash } from '../utils';

export default async function dlFile(name: string) {
  let asset = new Asset(name);
  await asset.fetchFile();
  if (asset.ext !== 'png' && asset.ext !== 'jpg' && asset.ext !== 'm4a' && asset.ext !== 'mp4') {
    await asset.decodeFile();
  }
  writeFile(path.resolve(SAVE_PATH, replaceSlash(name)), asset.data, (err: any) => {
    if (err) {
      console.log(`error: ${err.code}`);
      process.exit(1);
    }
    console.log(`write "${name}" finished`);
  });
}

if (require.main === module) {
  dlFile(process.argv[2]);
}
