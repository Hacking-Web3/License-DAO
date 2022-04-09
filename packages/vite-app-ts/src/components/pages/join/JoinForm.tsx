import { Form, Button } from 'antd';
import { FC } from 'react';
import { Web3Storage } from 'web3.storage';
import { CIDString } from 'web3.storage/dist/src/lib/interface';

import CoverLetterForm from './CoverLetterForm';

import SubmitPageHeader from '~~/components/common/SubmitPageHeader';

const makeFileObjects = (content: string): File[] => {
  const blob = new Blob([content], { type: 'text/plain' });

  const files = [new File([blob], 'cover-letter.txt')];
  return files;
};

const makeStorageClient = (): Web3Storage | void => {
  if (process.env.VITE_WEB3_STORAGE_TOKEN) {
    return new Web3Storage({
      token: process.env.VITE_WEB3_STORAGE_TOKEN,
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
  const submit = async (values: Values): Promise<void> => {
    const files = makeFileObjects(values['cover-letter']);
    const cid = await storeFiles(files);
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
