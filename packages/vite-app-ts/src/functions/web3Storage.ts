import { Web3Storage } from 'web3.storage';
import { CIDString } from 'web3.storage/dist/src/lib/interface';

import { WEB3_STORAGE_TOKEN } from '~~/config/appConfig';

export const makeStorageClient = (): Web3Storage | void => {
  if (WEB3_STORAGE_TOKEN) {
    return new Web3Storage({
      token: WEB3_STORAGE_TOKEN,
    });
  }
};

export async function storeFiles(files: File[]): Promise<CIDString | undefined> {
  const client = makeStorageClient();
  if (client) {
    const cid = await client?.put(files);
    console.log('stored files with cid:', cid);
    return cid;
  }
}

export async function retrieveFiles(cid: CIDString) {
  const client = makeStorageClient();
  if (client) {
    const res = await client.get(cid);
    if (res) {
      console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
      }

      // unpack File objects from the response
      const files = await res.files();
      for (const file of files) {
        console.log(`${file.cid} -- ${file.name} -- ${file.size}`);
      }
    }
  }
}
