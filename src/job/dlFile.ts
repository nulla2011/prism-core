import Asset, { fileType, HASHED_PREFIX, prefixKeys } from '../core/assets';
import { writeFile, readFileSync } from 'fs';
import path from 'path';
import { SAVE_PATH } from '../settings';
import { replaceSlash } from '../utils';
import findHash from '../utils/findHash';

const hashResources = JSON.parse(
  readFileSync('C:/Users/n/Documents/sc-assets/_response/hashResources.json', 'utf-8')
);
export default async function dlFile(name: string) {
  let asset = new Asset(name);
  for (const key in HASHED_PREFIX) {
    if (name.startsWith(key)) {
      asset.getHash((n) => {
        let fileName = path.basename(n).replace(path.extname(n), '');
        return findHash(fileName, HASHED_PREFIX[key as prefixKeys], hashResources);
      });
      break;
    }
  }
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
