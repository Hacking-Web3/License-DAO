import { Form, Button } from 'antd';
import { FC } from 'react';

import storeFiles from '../../../../scripts/store.mjs'

import CoverLetterForm from './CoverLetterForm';

import SubmitPageHeader from '~~/components/common/SubmitPageHeader';

const JoinForm: FC<any> = () => {
  const submit = (values: any): void => {
    storeFiles(CoverLetterForm)
    // TODO: upload `values["cover-letter"] to web3.storage
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
