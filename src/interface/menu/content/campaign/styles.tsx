import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  pointer-events: all;
  background-color: rgb(1, 24, 41) !important;
  border-radius: 10px;
  padding: 1rem;
  color: #fff;

  .title {
    text-align: center;
    align-self: center;

    font-size: 24px;
    font-weight: 700;
    margin-bottom: 3rem;
    margin-top: 1rem;
  }

  input {
    border: 1px solid #fff;
    border-radius: 5px;
    font-size: 16px;
    padding: 1rem;
    background-color: transparent;
    margin-top: 4px;
    color: #fff;
    margin-bottom: 2rem;
  }
  .input-label {
    font-weight: 700;
    font-size: 14px;
  }
  button {
    background-color: #3898ec;
    border-radius: 10px;
    color: #fff;

    cursor: pointer;
    margin-bottom: 2rem;
    border: none;
    align-self: stretch;
    padding: 1rem;
  }
`;
