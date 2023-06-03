import { IWallet } from "~type/wallet";
import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

export class Wallet implements IWallet {
    address = "";
    isConnected = false;

    async connect() {
        // ... 지갑 연결 로직
        // 예를 들어, Web3 또는 Ethers.js를 사용하여 사용자의 Ethereum 주소를 가져옵니다.
        // const userWalletAddress = await ethereum.request({ method: 'eth_requestAccounts' });
        // this.address = userWalletAddress[0];
        // this.isConnected = true;
        this.isConnected = true;
        this.address = "test0x0x0x0x0000";
        console.log('Wallet Class connect called');
    }

    disconnect() {
        // 지갑 연결을 해제합니다.
        this.address = "";
        this.isConnected = false;
    }
}
