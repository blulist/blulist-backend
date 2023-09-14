import axios, { AxiosResponse } from 'axios';

// export async function streamFileApi(fileUrl: string): Promise<AxiosResponse> {
//   return await axios({
//     method: 'GET',
//     url: fileUrl,
//     responseType: 'stream',
//     headers: {
//       accept: '*/*',
//       'accept-language': 'en-US,en;q=0.9',
//       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     },
//   });
// }

export async function streamFileApi(
  fileUrl: string,
  Range?: string,
): Promise<AxiosResponse> {
  const headers: any = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  if (Range) {
    headers.Range = Range;
  }

  return axios({
    method: 'GET',
    url: fileUrl,
    responseType: 'stream',
    headers,
  });
}
