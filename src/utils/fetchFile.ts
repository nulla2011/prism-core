import Axios, { AxiosResponse } from 'axios';
import { URL_PREFIX, PRINT_HASH } from '../settings';

export default async function fetchFile(name: string) {
  if (PRINT_HASH) {
    console.log(name);
  }
  let response: AxiosResponse;
  let service = Axios.create({
    baseURL: URL_PREFIX,
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });
  service.interceptors.response.use((response) => {
    if (response.headers['content-type']?.includes('text/html')) {
      //404 页面
      console.log('404 not found!');
      process.exit(1);
    }
    return response;
  });
  response = await service.get(name).catch((error) => {
    console.log(`${error}`);
    process.exit(1);
  });
  if (response.status >= 300) {
    throw new Error('response ' + response.status);
  }
  return response.data;
}
