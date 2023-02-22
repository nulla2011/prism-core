import Axios, { AxiosResponse } from 'axios';
// import { writeFileSync } from 'fs';

export default async function fetchFile(URL: URL) {
  let response: AxiosResponse;
  response = await Axios.get(URL.href, {
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  }).catch((error) => {
    console.log(error);
    process.exit(1);
  });
  if (response.status >= 300) {
    throw new Error('response ' + response.status);
  }
  // writeFileSync('t', response.data);
  return response.data;
}
