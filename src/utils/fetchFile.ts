import Axios, { AxiosResponse } from 'axios';
import { PRINT_HASH } from '../settings';
import { URL_PREFIX } from '../constants/url';

export default async function fetchFile(name: string) {
  if (PRINT_HASH) {
    console.log(name);
  }
  let response: AxiosResponse;
  let service = Axios.create({
    baseURL: URL_PREFIX,
    headers: {
      referer: 'https://shinycolors.enza.fun',
    },
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });
  service.interceptors.response.use((response) => {
    if (response.headers['content-type']?.includes('text/html')) {
      //404 页面
      throw new Error('404 not found!');
    }
    return response;
  });
  response = await service.get(name).catch((error) => {
    throw new Error(`${error}`);
  });
  if (response.status >= 300) {
    throw new Error('response ' + response.status);
  }
  return response.data;
}
