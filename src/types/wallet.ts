export interface IWallet {
    /**
     * Connected wallet address.
     */
    readonly address: string

    /**
     * Wallet is connected.
     */
    readonly isConnected: boolean

    /**
     * Connect the wallet.
     */
    connect(): Promise<void>

    /**
     * Disconnect the wallet.
     */
    disconnect(): void
}
