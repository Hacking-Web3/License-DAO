import { Form, Button } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { FC, useContext } from 'react';
import { Web3Storage } from 'web3.storage';
import { CIDString } from 'web3.storage/dist/src/lib/interface';

import CoverLetterForm from './CoverLetterForm';

import SubmitPageHeader from '~~/components/common/SubmitPageHeader';
import { WEB3_STORAGE_TOKEN } from '~~/config/appConfig';
import { useAppContracts } from '~~/config/contractContext';

const makeFileObjects = (content: string): File[] => {
  const blob = new Blob([content], { type: 'text/plain' });

  const files = [new File([blob], 'cover-letter.txt')];
  return files;
};

const makeStorageClient = (): Web3Storage | void => {
  if (WEB3_STORAGE_TOKEN) {
    return new Web3Storage({
      token: WEB3_STORAGE_TOKEN,
    });
  }
};

async function storeFiles(files: File[]): Promise<CIDString | undefined> {
  const client = makeStorageClient();
  const cid = await client?.put(files);
  console.log('stored files with cid:', cid);
  return cid;
}

interface Values {
  'cover-letter': string;
}

const JoinForm: FC<any> = () => {
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const licenseDAO = useAppContracts('LicenseDAO', ethersContext.chainId);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const address = ethersContext.account ?? '';
  const submit = async (values: Values): Promise<void> => {
    const files = makeFileObjects(values['cover-letter']);
    const cid = await storeFiles(files);

    if (cid) {
      const result = tx?.(licenseDAO?.newProposal(address, 0, cid), (update: any) => {
        console.log('📡 Transaction Update:', update);
        if (update && (update.status === 'confirmed' || update.status === 1)) {
          // console.log(' 🍾 Transaction ' + update.hash + ' finished!');
          // console.log(
          // ' ⛽️ ' +
          // update.gasUsed +
          // '/' +
          // (update.gasLimit || update.gas) +
          // ' @ ' +
          // parseFloat(update.gasPrice) / 1000000000 +
          // ' gwei'
          // );
        }
      });
      console.log('awaiting metamask/web3 confirm result...', result);
      console.log(await result);
    }
  };
  return (
    <div className="join-form">
      <SubmitPageHeader>Your account</SubmitPageHeader>
      <Form onFinish={submit}>
        <CoverLetterForm />
        <Form.Item>
          <Button type="primary" shape="round" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinForm;
