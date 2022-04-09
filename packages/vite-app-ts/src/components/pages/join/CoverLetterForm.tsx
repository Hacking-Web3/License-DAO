import { Form, Input } from 'antd';
import { FC } from 'react';

const { TextArea } = Input;

const CoverLetterForm: FC<any> = () => (
  <div>
    <header className="join-header">To join, please submit cover letter</header>
    <Form.Item
      name="cover-letter"
      className="cover-letter"
      rules={[{ required: true, message: 'Please provide a cover letter' }]}>
      <TextArea rows={4} placeholder="Share about you" />
    </Form.Item>
    <div>
      <ol>
        <li>
          Before submitting, please review carefully everything, as after submitting the form you won’t be able to make
          changes.
        </li>
        <li>All the information you share will be visible for everyone.</li>
        <li>Voting process will take up to 7 days.</li>
      </ol>
    </div>
  </div>
);

export default CoverLetterForm;
