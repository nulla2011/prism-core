import Asset, { fileType } from '../core/assets';
import { writeFile } from 'fs';
import path from 'path';
import { SAVE_PATH } from '../settings';
import { replaceSlash } from '../utils';

export default async function dlFile(name: string) {
  let asset = new Asset(name);
  asset.getUrl();
  await asset.fetchFile();
  if (asset.ext === fileType.json || asset.ext === fileType.atlas) {
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
