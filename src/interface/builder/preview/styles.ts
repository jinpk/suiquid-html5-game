import styled, { keyframes } from "styled-components";

import { InterfaceFont, InterfaceColor } from "~type/interface";

const animationBlink = keyframes`
  0% { background: ${InterfaceColor.INFO} }
  50% { background: ${InterfaceColor.INFO_DARK} }
  100% { background: ${InterfaceColor.INFO} }
`;

export const Building: any = styled.div`
  width: 180px;
  height: 40px;
  padding: 10px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  position: relative;
`;

Building.Preview = styled.div`
  overflow: hidden;
  width: 34px;
  height: 40px;
  img {
    height: 100%;
  }
`;

Building.Number = styled.div`
  position: absolute;
  color: #000;
  font-family: ${InterfaceFont.MONOSPACE};
  font-size: 21px;
  line-height: 12px;
  right: 4px;
  top: 4px;
  opacity: 0.75;
`;
