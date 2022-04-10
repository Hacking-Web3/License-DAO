import { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ProposalPreview } from '~~/components/main/ProposalPreview';
// import { gql, request } from 'graphql-request';

const Members: FC<any> = () => {
  const MEMBERS_GQL = gql`
    {
      memberProposals(orderBy: createdAt, orderDirection: asc) {
        address
        ipfsHash
      }
      users(orderBy: createdAt, orderDirection: asc) {
        address
      }
    }
  `;

  const { loading, data } = useQuery(MEMBERS_GQL, { pollInterval: 2500 });
  console.log(data);
  if (data == undefined || !data) {
    return null;
  }
  return (
    <div>
      <div className="proposals">
        {data.memberProposals.map((proposal: any) => (
          <ProposalPreview
            proposalAddress={proposal.address}
            streamId={proposal.ipfsHash}
            quorum={0}
            minQuorum={33}
            support={0}
            minSupport={50}
            type="member"
            status="pending"></ProposalPreview>
        ))}
        {data.users.map((proposal: any) => (
          <ProposalPreview
            proposalAddress={proposal.address}
            streamId={proposal.ipfsHash}
            quorum={0}
            minQuorum={33}
            support={0}
            minSupport={50}
            type="member"
            status="pending"></ProposalPreview>
        ))}
      </div>
    </div>
  );
};

export default Members;
