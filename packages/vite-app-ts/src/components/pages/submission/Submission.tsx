import { FC, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Blockie, Address } from 'eth-components/ant';
import { useParams } from 'react-router-dom';
import { retrieveFiles } from '~~/functions/web3Storage';
import ProposalStatus from '~~/components/common/ProposalStatus';
import { Button, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEthersContext } from 'eth-hooks/context';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice } from 'eth-hooks';
import { useAppContracts } from '~~/config/contractContext';
import { transactor } from 'eth-components/functions';

interface SearchParams {
  address: string;
}

interface ISubmission {
  minSupport: number;
  minQuorum: number;
  totalMembers: number;
}

const Submission: FC<ISubmission> = (props) => {
  const { address } = useParams<SearchParams>();
  const [content, setContent] = useState<string>();
  const ethersContext = useEthersContext();
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
  const licenseDAO = useAppContracts('LicenseDAO', ethersContext.chainId);
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  // fetch proposal
  const PROPOSAL_GQL = gql`
    {
      memberProposal(id: "${address}") {
        ipfsHash,
        createdAt,
        votesFor,
        votesAgainst,
        numberVotes
      }
    }
  `;

  const { loading, data } = useQuery(PROPOSAL_GQL, { pollInterval: 2500 });
  if (data == undefined || !data) {
    return null;
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };
  const startDate = new Date(data.memberProposal.createdAt * 1000);

  const endDate = new Date();

  console.log(props);

  // fetch ipfs data from web3 storage
  retrieveFiles(data.memberProposal.ipfsHash).then(console.log);

  fetch(`https://ipfs.io/ipfs/${data.memberProposal.ipfsHash}/cover-letter.txt`)
    .then((response) => response && response.text())
    .then((result) => {
      setContent(result);
    });

  const vote = async (_vote: 1 | 2) => {
    const result = tx?.(licenseDAO?.voteOnProposal(address, _vote), (update: any) => {
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
  };

  const voteFor = async () => {
    await vote(1);
  };

  const voteAgainst = async () => {
    await vote(2);
  };

  return (
    <div>
      <header className="submission-header">Submission letter</header>
      <div>
        by <Address address={address}></Address>
      </div>
      <span className="submission-dates">
        <strong>Start date:</strong> {startDate.toLocaleDateString()} | <strong>End date:</strong>
      </span>
      {endDate.toLocaleDateString()}
      <div className="submission-stats">
        <ProposalStatus status="pending">Pending approval</ProposalStatus>
        <div>
          <div className="proposal-preview-stats-title">Quorum</div>
          <Progress
            percent={(data.memberProposal.numberVotes / props.totalMembers) * 100}
            success={{ percent: props.minQuorum, strokeColor: 'transparent' }}
            showInfo={false}
            strokeColor="#D7C9C3"
            trailColor="transparent"
            strokeWidth={13}
            className="proposal-preview-quorum"
          />
          {(data.memberProposal.numberVotes / props.totalMembers) * 100}%
        </div>
        <div>
          <div className="proposal-preview-stats-title">Support</div>
          <Progress
            percent={
              (data.memberProposal.votesFor / (data.memberProposal.votesFor + data.memberProposal.votesAgainst)) * 100
            }
            success={{ percent: props.minSupport, strokeColor: 'transparent' }}
            showInfo={false}
            strokeColor="#C6E5E3"
            trailColor="#F8D2D2"
            strokeWidth={13}
          />
          <div className="proposal-preview-vote-res">
            <span>
              YES{' '}
              {(data.memberProposal.votesFor / (data.memberProposal.votesFor + data.memberProposal.votesAgainst)) * 100}
              %
            </span>
            <span>
              NO{' '}
              {(data.memberProposal.votesAgainst / (data.memberProposal.votesFor + data.memberProposal.votesAgainst)) *
                100}
              %
            </span>
          </div>
        </div>
        <div>
          Voted: ${data.memberProposal.numberVotes} <UserOutlined />
        </div>
      </div>
      <div className="submission-content">{content}</div>
      <div>votes</div>

      <div className="submission-vote-controls">
        <Button onClick={voteFor}>Vote for</Button>
        <Button onClick={voteAgainst}>Vote against</Button>
      </div>
    </div>
  );
};

export default Submission;
