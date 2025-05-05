// TODO : convert this js file to a css one for more clean code

// components/FooterStyles.js

import styled from "styled-components";

export const Box = styled.div`
  padding: 2% 1%;
  background: #3435ff;
  width: 100%;
  color: white;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr; /* Première colonne plus large */
  gap: 5px;
  width: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 16px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #ff8200;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 32px;
  font-weight: bold;
`;
