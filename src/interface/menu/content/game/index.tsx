import { useWallet } from "@suiet/wallet-kit";
import React, { useCallback, useContext, useMemo } from "react";
import { GameContext } from "~lib/interface";
import { GameItem, GameItemContent, GameItemImage, GameList } from "./styles";
import { JsonRpcProvider, devnetConnection } from "@mysten/sui.js";
import { SMART_CONTRACT_ADDRESS } from "~lib/contract";
import { useQuery } from "react-query";
import { SuiquidAdVector } from "./types";
const provider = new JsonRpcProvider(devnetConnection);

export default function Game() {
  const game = useContext(GameContext);
  const wallet = useWallet();

  const { isLoading, error, data } = useQuery("games", () =>
    provider.getObject({
      id: SMART_CONTRACT_ADDRESS,
      options: {
        showType: true,
        showContent: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true,
        showDisplay: true,
      },
    })
  );

  const handleStartGame = useCallback(() => {
    if (!wallet.connected) {
      return alert("Please connect your wallet first:)");
    }
    game.startGame();
  }, [wallet]);

  const games = useMemo((): SuiquidAdVector[] => {
    if (!data) return [];
    if (!data.data) return [];
    if (!data.data?.content) return [];

    return data.data?.content.dataType === "moveObject"
      ? data.data.content.fields.inventory
      : [];
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {JSON.stringify(error)}</p>;

  return (
    <GameList>
      {games.map((x, i: number) => {
        return (
          <GameItem
            onClick={() => {
              handleStartGame();
            }}
            key={i}
          >
            <GameItemImage>
              <img alt="image" src={x.fields.url} />
            </GameItemImage>
            <GameItemContent>
              <span>Game</span>: Give me my mnemonic!
              <br /> <span>Sponsor</span>: {x.fields.title}
              <br />
              <span>Prize</span>: {x.fields.deposit}sui
            </GameItemContent>
          </GameItem>
        );
      })}
    </GameList>
  );
}
