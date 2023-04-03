export const SAVE_PATH =
  process.platform === 'win32'
    ? process.env.USERPROFILE + '/Documents/sc-assets/'
    : '~./sc-assets/';
export const PRINT_HASH = false;
