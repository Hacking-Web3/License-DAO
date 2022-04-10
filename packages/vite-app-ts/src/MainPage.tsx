import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '~~/styles/main-page.css';

import { useBalance, useContractReader, useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';

import SectionHeader from './components/common/SectionHeader';
import { MainPageMenu, MainPageContracts, MainPageFooter, MainPageHeader } from './components/main';
import { useScaffoldHooksExamples as useScaffoldHooksExamples } from './components/main/hooks/useScaffoldHooksExamples';
import Intro from './components/main/Intro';
import { ProposalPreview } from './components/main/ProposalPreview';
import JoinForm from './components/pages/join/JoinForm';
import Subgraph from './components/pages/subgraph/Subgraph';
import { APPROVED, PENDING } from './constants';

import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { Hints } from '~~/components/pages';
import { BURNER_FALLBACK_ENABLED, MAINNET_PROVIDER, SUBGRAPH_URI } from '~~/config/appConfig';
import { useAppContracts, useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';
import { NETWORKS } from '~~/models/constants/networks';
import Members from './components/pages/members/Members';
import Submission from './components/pages/submission/Submission';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * See config/appConfig.ts for configuration, such as TARGET_NETWORK
 * See MainPageContracts.tsx for your contracts component
 * See contractsConnectorConfig.ts for how to configure your contracts
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * For more
 */

/**
 * The main component
 * @returns
 */
export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  // -----------------------------
  // Load Contracts
  // -----------------------------
  // 🛻 load contracts
  useLoadAppContracts();
  // 🏭 connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:
  // 🚦 disable this hook to stop console logs
  // 🏹🏹🏹 go here to see how to use hooks!
  useScaffoldHooksExamples(scaffoldAppProviders);

  // -----------------------------
  // These are the contracts!
  // -----------------------------

  // init contracts
  const licenseDAO = useAppContracts('LicenseDAO', ethersContext.chainId);
  const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);

  // keep track of a variable from the contract in the local React state:
  const [quorum, updateQuorum] = useContractReader(licenseDAO, licenseDAO?.quorum, []);
  const [support, updateSupport] = useContractReader(licenseDAO, licenseDAO?.support, []);

  // 📟 Listen for broadcast events
  // const [setPurposeEvents] = useEventListener(licenseDAO, 'SetPurpose', 0);

  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------
  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <div className="App">
      {/* Routes should be added between the <Switch> </Switch> as seen below */}
      <BrowserRouter>
        <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
        <Switch>
          <Route exact path="/">
            <Intro />
            <SectionHeader type={APPROVED}>Approved licenses</SectionHeader>
            <div className="proposals">
              <ProposalPreview
                licenseTitle="Creative Commons 0 License"
                licenseVersion="1.0"
                licenseLocality="Universal"
                author="Anja Blaj"
                streamId="streamId"
                quorum={66}
                minQuorum={quorum?.div(100).toNumber() || 0}
                support={70}
                minSupport={support?.div(100).toNumber() || 0}
                proposalAddress={'some address'}
                type="license"
                status="approved"></ProposalPreview>
            </div>
            {/*
            <MainPageContracts scaffoldAppProviders={scaffoldAppProviders} />
              */}
          </Route>
          <Route path="/join">
            <JoinForm />
          </Route>
          <Route path="/members">
            <Members />
          </Route>
          <Route path="/proposals/u/:address">
            <Submission minQuorum={quorum?.div(100).toNumber() || 0} minSupport={support?.div(100).toNumber() || 0} />
          </Route>
          {/* you can add routes here like the below examlples */}
          <Route path="/hints">
            <Hints
              address={ethersContext?.account ?? ''}
              yourCurrentBalance={yourCurrentBalance}
              mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
              price={ethPrice}
            />
          </Route>
          {/*
          <Route path="/exampleui">
            <ExampleUI
              mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
              yourCurrentBalance={yourCurrentBalance}
              price={ethPrice}
            />
          </Route>
          <Route path="/mainnetdai">
            {MAINNET_PROVIDER != null && (
              <GenericContract
                contractName="DAI"
                contract={mainnetDai}
                mainnetAdaptor={scaffoldAppProviders.mainnetAdaptor}
                blockExplorer={NETWORKS.mainnet.blockExplorer}
              />
            )}
          </Route>
    /*}
          {/* Subgraph also disabled in MainPageMenu, it does not work, see github issue! */}
          <Route path="/subgraph">
            <Subgraph subgraphUri={SUBGRAPH_URI} mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider} />
          </Route>
        </Switch>
      </BrowserRouter>

      <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
    </div>
  );
};
