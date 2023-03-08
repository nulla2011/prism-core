import { readFileSync, appendFileSync, mkdirSync } from 'fs';
import { SAVE_PATH } from '../settings';
import path from 'path';

let version = parseInt(process.argv[2]);
let oldData: Record<string, number> = JSON.parse(
  readFileSync(path.resolve(SAVE_PATH, `asset_list_v${version - 1}.json`), 'utf-8')
);
let newData: Record<string, number> = JSON.parse(
  readFileSync(path.resolve(SAVE_PATH, `asset_list_v${version}.json`), 'utf-8')
);
// if (!existsSync(path.resolve(SAVE_PATH, `v${version}/`))) {
mkdirSync(path.resolve(SAVE_PATH, `v${version}/`));
// }
for (const key in newData) {
  if (!oldData.hasOwnProperty(key)) {
    appendFileSync(
      path.resolve(SAVE_PATH, `v${version}/`, 'new.txt'),
      `${key} : ${newData[key]}\n`
    );
  } else {
    if (oldData[key] !== newData[key]) {
      appendFileSync(
        path.resolve(SAVE_PATH, `v${version}/`, 'version-change.txt'),
        `${key} : ${oldData[key]} -> ${newData[key]}\n`
      );
    }
    delete oldData[key];
  }
}
for (const key in oldData) {
  appendFileSync(path.resolve(SAVE_PATH, `v${version}/`, 'del.txt'), `${key} : ${oldData[key]}`);
}
