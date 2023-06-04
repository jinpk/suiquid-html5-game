import { useWallet } from "@suiet/wallet-kit";
import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Content = styled.div`
  background-color: rgb(1, 24, 41) !important;
  margin: auto;
  min-width: 600px;
  z-index: 2;
  border-radius: 20px;
  padding-top: 40px;
  min-height: 300px;
`;

const TextH1 = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: 700;
  align-self: center;
  text-align: center;
`;

const Address = styled.p`
  font-size: 24px;
  color: #fff;
  text-align: center;
  align-self: center;
  margin-top: 10px;
`;

const Party = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  img {
    width: 74px;
    height: 74px;
  }
`;

const Earn = styled.p`
  margin-top: 5rem;
  margin-bottom: 3rem;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1;
  font-weight: 20px;
  font-weight: 600;
  text-align: center;
  align-self: center;
  span {
    font-size: 2rem;
    color: #3898ec;
    font-weight: bold;
  }
`;

function GameFinished() {
  const wallet = useWallet();
  // console.log("hi?");
  return (
    <Container>
      <Content>
        <Party>
          <img alt="part" src={"/assets/party.gif"} />
          <img alt="part" src={"/assets/party.gif"} />
          <img alt="part" src={"/assets/party.gif"} />
        </Party>
        <TextH1>Congrat! Winner:)</TextH1>
        <Address>
          {wallet.address?.substring(0, 3)}...
          {wallet.address?.substring(
            wallet.address?.length - 6,
            wallet.address?.length
          )}
        </Address>
        <Earn>
          You Earnd <span>300</span> sui
        </Earn>
      </Content>
    </Container>
  );
}

export default memo(GameFinished);
