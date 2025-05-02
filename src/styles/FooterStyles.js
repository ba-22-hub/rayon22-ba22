// components/FooterStyles.js

import styled from "styled-components";

export const Box = styled.div`
  padding: 2% 1%;
  background: #3435ff;
  width: 100%;
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
  align-items: center; /* Centrer horizontalement */
  text-align: center; /* Centrer le texte */
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(0, 1fr)
  ); /* Colonnes qui remplissent tout l'espace */
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
