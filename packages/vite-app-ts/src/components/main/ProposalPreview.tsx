import { Progress } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ProposalPreviewProps {
  licenseTitle: string;
  licenseVersion: string;
  licenseLocality: string;
  author: string;
  streamId: string;
  quorum: number;
  minQuorum: number;
  support: number;
  minSupport: number;
  status: string;
  proposalAddress: string;
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
}) => (
  <div className="proposal-preview">
    <div className="proposal-preview-details">
      <div className="proposal-preview-title">
        <Link to={`/proposals/l/${proposalAddress}`}>
          {licenseTitle} {licenseVersion} {licenseLocality}
        </Link>
      </div>
      <div className="proposal-preview-info">
        <div className="proposal-preview-author">
          {/* <img src=""></img> */}
          by {author}
        </div>
        <div className="proposal-preview-og-link">
          <a href={'https://tiles.ceramic.community/document/' + streamId} target="_blank" rel="noreferrer">
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
    <div style={{ textAlign: 'right' }} className="proposal-preview-status">
      <span>{status}</span>
    </div>
  </div>
);
