import hashList from 'C:/Users/n/Documents/sc-assets/_response/hashResources.json';
import { HASHED_PREFIX, prefixKeys, isSkin } from '../core/assets';

export default function findHash(id: string, resourceType: typeof HASHED_PREFIX[prefixKeys]) {
  let list;
  if (isSkin(id)) {
    list = hashList.skins;
    for (const el of list) {
      if (el.skinCharacters[0].id === id) {
        if (el.kind === 'plain') {
          return null;
        } else {
          return el.skinCharacters[0].hash;
        }
      }
    }
    return null;
  } else {
    switch (resourceType) {
      case 'idols':
        list = hashList.idols;
        break;
      case 'supportIdols':
        list = hashList.supportIdols;
        break;
      case 'music':
        list = hashList.concertBgm;
        break;
      case 'comics':
        list = hashList.comics;
        break;
    }
    for (const el of list) {
      if (el.id === id) {
        return el.hash!;
      }
    }
    return null;
  }
}
