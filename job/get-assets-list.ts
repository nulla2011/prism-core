import getAssetsMap from './get-assets-map';
import Asset from '../core/assets';
import { writeFile } from 'fs';
import path from 'path';
import { SAVE_PATH } from '../settings';

export default async function getAssetsList() {
  let { map, version } = await getAssetsMap();
  let names: string[] = [];
  for (const name of map.chunks) {
    names.push(Object.keys(name)[0]);
  }
  let tasks = [];
  let jsonList: Object[] = new Array(names.length).fill({});
  for (let i = 0; i < names.length; i++) {
    let asset = new Asset(names[i]);
    asset.getUrl();
    tasks.push(
      asset
        .fetchFile()
        .then(() => asset.decodeFile())
        .then(() => {
          jsonList[i] = JSON.parse(asset.data as string);
        })
    );
  }
  await Promise.all(tasks);
  let list = jsonList.reduce((p, c) => Object.assign(p, c), new Object());
  writeFile(
    path.resolve(`${SAVE_PATH}/asset_list_v${version}.json`),
    JSON.stringify(list, null, 2),
    { flag: 'wx' },
    (err: any) => {
      // if (err) console.log(`error: ${err.code}`);
      console.log(`write "asset_list_v${version}.json" finished`);
    }
  );
}

if (require.main === module) {
  getAssetsList();
}
