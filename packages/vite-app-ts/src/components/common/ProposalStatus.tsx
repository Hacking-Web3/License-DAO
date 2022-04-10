import { FC } from 'react';

interface IProposalStatus {
  status: 'approved' | 'pending' | 'rejected';
  style?: Object;
  children?: any;
}

const ProposalStatus: FC<IProposalStatus> = (props) => (
  <div style={props.style} className={`proposal-status ${props.status === 'approved' && 'approved'}`}>
    <span>{props.children}</span>
  </div>
);

export default ProposalStatus;
