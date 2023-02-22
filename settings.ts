import atbash from './lib/atbash';
export const DOMAIN = atbash('hsrmbxlolih.vmaz.ufm');
export const URL_PREFIX = `https://${DOMAIN}/assets/`;
export const SAVE_PATH =
  process.platform === 'win32'
    ? process.env.USERPROFILE + '/Documents/sc-assets/'
    : '~./sc-assets/';
