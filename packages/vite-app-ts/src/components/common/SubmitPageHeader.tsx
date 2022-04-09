import { FC } from 'react';

interface SubmitPageHeaderProps {
  children: any;
}

const SubmitPageHeader: FC<SubmitPageHeaderProps> = (props) => (
  <header className="submit-page-header">{props.children}</header>
);

export default SubmitPageHeader;
