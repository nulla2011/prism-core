import Axios, { AxiosResponse } from 'axios';
import is404 from './404';

export default async function fetchFile(URL: URL) {
  let response: AxiosResponse;
  response = await Axios.get(URL.href, {
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  }).catch((error) => {
    console.log(`${error}`);
    process.exit(1);
  });
  if (response.status >= 300) {
    throw new Error('response ' + response.status);
  }
  if (is404(response.data)) {
    //判断 head？
    console.log('resource error!');
    process.exit(1);
  }
  return response.data;
}
