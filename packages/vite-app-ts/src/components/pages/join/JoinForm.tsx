import { Form, Button } from 'antd';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { FC, useContext } from 'react';

import CoverLetterForm from './CoverLetterForm';

import SubmitPageHeader from '~~/components/common/SubmitPageHeader';
import { useAppContracts } from '~~/config/contractContext';
import { storeFiles } from '~~/functions/web3Storage';

const makeFileObjects = (content: string): File[] => {
  const blob = new Blob([content], { type: 'text/plain' });

  const files = [new File([blob], 'cover-letter.txt')];
  return files;
};

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
