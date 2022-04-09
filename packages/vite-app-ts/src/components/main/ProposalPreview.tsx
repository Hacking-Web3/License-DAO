import { FC } from 'react';

interface ProposalPreviewProps {
  licenseTitle: string;
  licenseVersion: string;
  licenseLocality: string;
  author: string;
  streamId: string;
  turnOver: number;
  minTurnOver: number;
  support: number;
  minSupport: number;
  status: string;
}

export const ProposalPreview: FC<ProposalPreviewProps> = ({
  licenseTitle,
  licenseVersion,
  licenseLocality,
  author,
  streamId,
  turnOver,
  minTurnOver,
  support,
  minSupport,
  status,
}) => (
  <div>
    <div>
      <div>
        {licenseTitle} {licenseVersion} {licenseLocality}
      </div>
      <div>
        <div>
          {/* <img src=""></img> */}
          {author}
        </div>
        <div>
          <a href={'https://tiles.ceramic.community/document/' + streamId} target="_blank" rel="noreferrer">
            {streamId}
          </a>
        </div>
      </div>
    </div>
    <div>
      <div>
        TURNOVER
        <meter id="turnOverBar" low={minTurnOver} value={turnOver} max="100"></meter>
        {turnOver}%
      </div>
      <div>
        SUPPORT
        <meter id="supportBar" low={support - 0.1} value={support} max="100"></meter>
        YES{support}% NO {100 - support}%
      </div>
      <div>{status}</div>
    </div>
  </div>
);
