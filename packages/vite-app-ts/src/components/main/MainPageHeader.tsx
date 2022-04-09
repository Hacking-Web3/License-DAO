import { getNetwork } from '@ethersproject/networks';
import { Alert, PageHeader } from 'antd';
import { Account } from 'eth-components/ant';
import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC, ReactElement } from 'react';

import { MenuItem } from './MenuItem';

import { FaucetHintButton } from '~~/components/common/FaucetHintButton';
import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { getNetworkInfo } from '~~/functions';

// displays a page header
export interface IMainPageHeaderProps {
  scaffoldAppProviders: IScaffoldAppProviders;
  price: number;
}

/**
 * ✏ Header: Edit the header and change the title to your project name.  Your account is on the right *
 * @param props
 * @returns
 */
export const MainPageHeader: FC<IMainPageHeaderProps> = (props) => {
  const ethersContext = useEthersContext();
  const selectedChainId = ethersContext.chainId;

  // 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));

  /**
   * this shows the page header and other informaiton
   */
  const left = (
    <>
      <div>
        <PageHeader title="Licenses DAO" style={{ cursor: 'pointer', fontWeight: 900 }} />
      </div>
      {props.children}
    </>
  );

  /**
   * 👨‍💼 Your account is in the top right with a wallet at connect options
   */
  const right = (
    <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10, zIndex: 1 }}>
      <div>
        <MenuItem to="/licenses">Licenses</MenuItem>
        <MenuItem to="/members">Members</MenuItem>
      </div>
      <Account
        createLoginConnector={props.scaffoldAppProviders.createLoginConnector}
        ensProvider={props.scaffoldAppProviders.mainnetAdaptor?.provider}
        price={props.price}
        blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
        hasContextConnect={true}
      />
      <FaucetHintButton scaffoldAppProviders={props.scaffoldAppProviders} gasPrice={gasPrice} />
      {props.children}
    </div>
  );

  /**
   * display the current network on the top left
   */
  let networkDisplay: ReactElement | undefined;
  if (selectedChainId && selectedChainId !== props.scaffoldAppProviders.targetNetwork.chainId) {
    const description = (
      <div>
        You have <b>{getNetwork(selectedChainId)?.name}</b> selected and you need to be on{' '}
        <b>{getNetwork(props.scaffoldAppProviders.targetNetwork)?.name ?? 'UNKNOWN'}</b>.
      </div>
    );
    networkDisplay = (
      <div style={{ zIndex: 2, position: 'absolute', right: 0, top: 90, padding: 16 }}>
        <Alert message="⚠️ Wrong Network" description={description} type="error" closable={false} />
      </div>
    );
  } else {
    networkDisplay = (
      <div
        style={{
          position: 'absolute',
          right: 16,
          top: 84,
          padding: 10,
          color: props.scaffoldAppProviders.targetNetwork.color,
        }}>
        {props.scaffoldAppProviders.targetNetwork.name}
      </div>
    );
  }

  return (
    <>
      {left}
      {networkDisplay}
      {right}
    </>
  );
};
