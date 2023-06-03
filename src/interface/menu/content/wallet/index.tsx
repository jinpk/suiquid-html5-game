import React, { useContext, useState, useEffect } from 'react';

import { Wrapper, Wallet, Values } from './styles';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';

export const ComponentWallet: React.FC = () => {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected) return;
    console.log('connected wallet name : ', wallet.name);
    console.log('account address : ', wallet.account?.address);
    console.log('account public key : ', wallet.account?.publicKey);

  }, [wallet.connected]);


  return (
    <Wrapper>
      <p>Your SUI address : {wallet.account?.address || "Not connected"}</p>
      <br></br>
      <Wallet>
        <Wallet.Description>Connect SUI Wallet</Wallet.Description>

        <Values>
          <ConnectButton>
            <Values.Item>
              connect wallet
            </Values.Item>
          </ConnectButton>
        </Values>
      </Wallet>
    </Wrapper>
  );
};

ComponentWallet.displayName = 'ComponentWallet';
