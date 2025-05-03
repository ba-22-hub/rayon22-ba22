// Importing dependencies
import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "../styles/FooterStyles";

// Importing assets
import rayonLogo from "../assets/logos/logo.png"
import banqueLogo from "../assets/logos/banquesAlimentaires.png"

const Footer = () => {
    return (
        <Box>
            <FooterContainer>
                <Row>

                    <Column>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <a href="/">
                            <img src={rayonLogo} alt="logo1" style={{ height: "35px" }} />
                        </a>
                        <a href="https://www.banquealimentaire.org" target="_blank" rel="noopener noreferrer">
                            <img src={banqueLogo} alt="logo2" style={{ height: "35px" }} />
                        </a>
                    </div>
                        <p>le RAYON est une initiative des Banques Alimentaires</p>
                    </Column>

                    <Column>
                        <FooterLink href="#">
                            Mentions Légales
                        </FooterLink>
                        <FooterLink href="#">
                            Politique d’utilisation des cookies
                        </FooterLink>
                    </Column>

                    <Column>
                        <FooterLink href="#">
                            Charte de fonctionnement
                        </FooterLink>
                        <FooterLink href="#">
                            Politique d’utilisation des cookies
                        </FooterLink>
                    </Column>

                    <Column>
                        <FooterLink href="https://www.instagram.com/banque.alimentaire22/">
                            <i className="fab fa-instagram">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Instagram
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="mailto:ba220@banquealimentaire.org">
                            ba220@banquealimentaire.org
                        </FooterLink>
                    </Column>

                </Row>
            </FooterContainer>
        </Box>
    );
};
export default Footer;