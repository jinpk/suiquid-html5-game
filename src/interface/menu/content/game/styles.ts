import styled from "styled-components";

export const GameList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameItem = styled.div`
  display: flex;
  background-color: rgb(1, 24, 41) !important;
  border-radius: 10px;
  height: 100px;
  padding: 10px;

  pointer-events: all;

  margin-bottom: 1rem;
  color: #000;

  cursor: pointer;
  :hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
`;

export const GameItemImage = styled.div`
  border-radius: 5px;
  height: 80px;
  width: 80px;
  background-color: #ddd;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const GameItemContent = styled.span`
  color: #fff;
  margin-left: 8px;
  align-items: flex-start;
  line-height: 24px;
  span {
    font-size: 13px;
    color: #ddd;
  }
`;
