import cn from "classnames";
import React, { useContext, useMemo, useState } from "react";

import { COPYRIGHT } from "~const/game";
import { GameContext } from "~lib/interface";
import { MenuAudio, MenuItem } from "~type/menu";

import { ComponentAbout } from "./content/about";
import { ComponentControls } from "./content/controls";
import { ComponentWallet } from "./content/wallet";
import {
  Wrapper,
  Content,
  Copyright,
  Logotype,
  Menu,
  Sidebar,
  Line,
} from "./styles";
import Game from "./content/game";
import { QueryClient, QueryClientProvider } from "react-query";
import Campaign from "./content/campaign";
import GameFinished from "./game-finished";

const queryClient = new QueryClient();

export const ComponentMenu: React.FC = () => {
  const game = useContext(GameContext);

  const [currentContent, setCurrentContent] = useState("Game");

  const menuItems = useMemo<MenuItem[]>(
    () => [
      ...(game.isPaused
        ? [
            {
              label: "Continue",
              onClick: () => {
                game.resumeGame();
              },
            },
            {
              label: "Restart",
              onClick: () => {
                // eslint-disable-next-line no-alert
                if (window.confirm("Do you confirm start new game?")) {
                  game.restartGame();
                }
              },
            },
          ]
        : [
            {
              label: "Games",
              onClick: () => {
                setCurrentContent("Game");
              },
            },
          ]),

      {
        label: "Campaigns",
        onClick: () => setCurrentContent("Campaign"),
      },
      {
        label: "About",
        onClick: () => setCurrentContent("About"),
      },
      {
        label: "Controls",
        onClick: () => setCurrentContent("Controls"),
      },
      {
        label: "Wallet",
        onClick: () => setCurrentContent("Wallet"),
      },
    ],
    []
  );

  const Component = useMemo(() => {
    switch (currentContent) {
      case "Campaign":
        return <Campaign />;
      case "Game":
        return <Game />;
      case "About":
        return <ComponentAbout />;
      case "Controls":
        return <ComponentControls />;
      case "Wallet":
        return <ComponentWallet />;
      default:
        return null;
    }
  }, [currentContent]);

  const handleClick = (item: MenuItem) => {
    game.sound.play(MenuAudio.CLICK);
    item.onClick();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Sidebar>
          <Logotype>SUIQUID</Logotype>
          <Menu>
            {menuItems.map((item) => (
              <Menu.Item
                key={item.label}
                onClick={() => handleClick(item)}
                className={cn({
                  active: item.label === currentContent,
                })}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
          <Copyright>{COPYRIGHT.join("\n")}</Copyright>
        </Sidebar>
        <Line />

        <Content>
          <Content.Title>{currentContent}</Content.Title>
          <Content.Wrapper>{Component}</Content.Wrapper>
        </Content>
      </Wrapper>

      {
        //  <GameFinished />
      }
    </QueryClientProvider>
  );
};

ComponentMenu.displayName = "ComponentMenu";
