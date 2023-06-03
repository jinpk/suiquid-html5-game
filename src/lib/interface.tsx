import React, { createContext, useContext, useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { IGame, IScene } from '~type/game';
import { IWallet } from '~type/wallet';
import { Wallet } from '~lib/wallet';
import { ConnectButton, WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
const defaultWallet = new Wallet();
export const GameContext = createContext<IGame>(null);
const gameUI = document.getElementById('game-ui');

export function useWorldUpdate(callback: () => void) {
  const game = useContext(GameContext);

  useEffect(() => {
    callback();

    game.world.events.on(Phaser.Scenes.Events.UPDATE, callback);

    return () => {
      game.world.events.off(Phaser.Scenes.Events.UPDATE, callback);
    };
  }, []);
}

export class Interface<T> {
  readonly container: HTMLDivElement;

  readonly root: Root;

  readonly scene: IScene;

  readonly wallet: IWallet = new Wallet(); // create the Wallet instance here


  constructor(
    scene: IScene,
    Component: React.FC<T>,
    props?: T,
  ) {
    this.container = document.createElement('div');
    this.container.setAttribute('data-component', Component.displayName);
    gameUI.appendChild(this.container);

    this.root = createRoot(this.container);
    this.root.render(
      <WalletProvider>
        <GameContext.Provider value={scene.game}>
          <Component {...props} />
        </GameContext.Provider>,
      </WalletProvider>
    );

    this.scene = scene;
    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
  }

  public destroy() {
    this.root.unmount();
    this.container.remove();
  }
}
