import { FC } from 'react';

import { APPROVED, PENDING } from '~~/constants';

interface SectionHeaderProps {
  children: any;
  type: string;
}

const SectionHeader: FC<SectionHeaderProps> = (props) => (
  <header className={`section-title ${props.type === APPROVED && 'approved'} ${props.type === PENDING && 'pending'}`}>
    {props.children}
  </header>
);

export default SectionHeader;
