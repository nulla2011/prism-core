import hashFileName from '../core/hashFileName';
import Asset from '../core/assets';
import { writeFile } from 'fs';
import path from 'path';
import { URL_PREFIX, SAVE_PATH } from '../settings';

const ASSET_MAP = 'asset-map.json';

export default async function getAssetsMap() {
  let assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP));
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  let map = JSON.parse(assetMap.data as string);
  let version = map.version;
  writeFile(
    path.resolve(`${SAVE_PATH}/asset_map_v${version}.json`),
    JSON.stringify(map, null, 2),
    { flag: 'wx' },
    (e: any) => {
      console.error(`error: ${e.code}`);
      console.log(`write "asset_map_v${version}.json" finished`);
    }
  );
  return { map, version };
}

if (require.main === module) {
  getAssetsMap();
}
