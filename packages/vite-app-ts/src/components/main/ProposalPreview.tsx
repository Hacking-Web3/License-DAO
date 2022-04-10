import { Progress } from 'antd';
import { Address, Blockie } from 'eth-components/ant';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProposalStatus from '../common/ProposalStatus';

interface ProposalPreviewProps {
  licenseTitle?: string;
  licenseVersion?: string;
  licenseLocality?: string;
  author?: string;
  streamId: string;
  quorum: number;
  minQuorum: number;
  support: number;
  minSupport: number;
  status: 'approved' | 'rejected' | 'pending';
  proposalAddress: string;
  type: 'member' | 'license';
}

export const ProposalPreview: FC<ProposalPreviewProps> = ({
  licenseTitle,
  licenseVersion,
  licenseLocality,
  author,
  streamId,
  quorum,
  minQuorum,
  support,
  minSupport,
  status,
  proposalAddress,
  type,
}) => {
  const renderMemberTitle = () => {
    return (
      <Link to={`/proposals/l/${proposalAddress}`}>
        {() => {
          if (type === 'member') {
            return { proposalAddress };
          } else {
            return `${licenseTitle} ${licenseVersion} ${licenseLocality}`;
          }
        }}
      </Link>
    );
  };
  const renderProposalTitle = () => {
    return (
      <Link to={`/proposals/l/${proposalAddress}`}>
        {() => {
          if (type === 'member') {
            return { proposalAddress };
          } else {
            return `${licenseTitle} ${licenseVersion} ${licenseLocality}`;
          }
        }}
      </Link>
    );
  };

  const renderTitle = () => {
    if (type === 'member') {
      return (
        <NavLink to={`/proposals/u/${proposalAddress}`}>
          <Address address={proposalAddress} />
        </NavLink>
      );
    }
  };
  return (
    <div className="proposal-preview">
      <div className="proposal-preview-details">
        <div className="proposal-preview-title">{renderTitle()}</div>
        <div className="proposal-preview-info">
          <div className="proposal-preview-author">
            {/* <img src=""></img> */}
            by {author}
          </div>
          <div className="proposal-preview-og-link">
            <a
              href={
                type === 'license'
                  ? 'https://tiles.ceramic.community/document/' + streamId
                  : `https://ipfs.io/ipfs/${streamId}/cover-letter.txt`
              }
              target="_blank"
              rel="noreferrer">
              original link
            </a>
          </div>
        </div>
      </div>
      <div className="proposal-preview-stats">
        <div>
          <div className="proposal-preview-stats-title">Quorum</div>
          <Progress
            percent={quorum}
            success={{ percent: minQuorum, strokeColor: 'transparent' }}
            showInfo={false}
            strokeColor="#D7C9C3"
            trailColor="transparent"
            strokeWidth={13}
            className="proposal-preview-quorum"
          />
          {quorum}%
        </div>
        <div>
          <div className="proposal-preview-stats-title">Support</div>
          <Progress
            percent={support}
            success={{ percent: minSupport, strokeColor: 'transparent' }}
            showInfo={false}
            strokeColor="#C6E5E3"
            trailColor="#F8D2D2"
            strokeWidth={13}
          />
          <div className="proposal-preview-vote-res">
            <span>YES{support}%</span>
            <span>NO {100 - support}%</span>
          </div>
        </div>
      </div>
      <ProposalStatus style={{ textAlign: 'right' }} status={status}>
        {status}
      </ProposalStatus>
    </div>
  );
};
