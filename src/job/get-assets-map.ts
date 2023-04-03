import hashFileName from '../core/hashFileName';
import Asset from '../core/assets';
import { writeFile, existsSync } from 'fs';
import path from 'path';
import { SAVE_PATH } from '../settings';
import { URL_PREFIX } from '../constants/url';

const ASSET_MAP = 'asset-map.json';

export default async function getAssetsMap() {
  let assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP));
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  let map = JSON.parse(assetMap.data as string);
  let version = map.version;
  let savePath = path.resolve(`${SAVE_PATH}/asset_map_v${version}.json`);
  if (!existsSync(savePath)) {
    writeFile(savePath, JSON.stringify(map, null, 2), { flag: 'wx' }, (err: any) => {
      if (err) {
        console.error(`error: ${err}`);
        process.exit(1);
      }
      console.log(`write "asset_map_v${version}.json" finished`);
    });
  }
  return { map, version };
}

if (require.main === module) {
  getAssetsMap();
}
