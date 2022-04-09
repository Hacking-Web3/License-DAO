import { GenericContract } from 'eth-components/ant/generic-contract';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC } from 'react';

import { ProposalPreview } from './ProposalPreview';

import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useAppContracts } from '~~/config/contractContext';
import { NETWORKS } from '~~/models/constants/networks';

import { UserForm } from './UserProfilForm';

export interface IMainPageContractsProps {
  scaffoldAppProviders: IScaffoldAppProviders;
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props 
 * @returns 
 */
export const MainPageContracts: FC<IMainPageContractsProps> = (props) => {
  const ethersContext = useEthersContext();
  const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);
  const yourContract = useAppContracts('YourContract', ethersContext.chainId);

  if (ethersContext.account == null) {
    /* return (
      <UserForm></UserForm>
    ); */
    return (
      <ProposalPreview
        licenseTitle="LicenseTitle"
        licenseVersion="Version"
        licenseLocality="locality"
        author="author"
        streamId="streamId"
        turnOver={66}
        minTurnOver={33}
        support={70}
        minSupport={2}
        status="validate"></ProposalPreview> 
    );
  }

return (
  <>
    <>
      {/* **********
          ❓ this scaffolding is full of commonly used components
          this <Contract/> component will automatically parse your ABI
          and give you a form to interact with it locally
        ********** */}
      <GenericContract
        contractName="YourContract"
        contract={yourContract}
        mainnetAdaptor={props.scaffoldAppProviders.mainnetAdaptor}
        blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
      />
      {/* **********
         * ❓ uncomment for a second contract:
         ********** */}
      {/*
          <GenericContract
            contractName="SecondContract"
            contract={contract={contractList?.['SecondContract']}
            mainnetProvider={props.appProviders.mainnetProvider}
            blockExplorer={props.appProviders.targetNetwork.blockExplorer}
            contractConfig={props.contractConfig}
          />
        */}
    </>
  </>
);
};
