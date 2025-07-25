// Importing dependencies
import React from "react";

// Importing styles
import "../styles/Footer.css";

// Importing assets
import rayonLogo from "../assets/logos/logo.png";
import banqueLogo from "../assets/logos/banquesAlimentaires.png";

const Footer = () => {
    return (
        <div className="footer-box">
            <div className="footer-container">
                <div className="footer-row">

                    <div className="footer-column">
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <a href="/">
                                <img src={rayonLogo} alt="logo1" style={{ height: "35px" }} />
                            </a>
                            <a href="https://www.banquealimentaire.org" target="_blank" rel="noopener noreferrer">
                                <img src={banqueLogo} alt="logo2" style={{ height: "35px" }} />
                            </a>
                        </div>
                        <p>le RAYON est une initiative des Banques Alimentaires</p>
                    </div>

                    <div className="footer-column">
                        <a href="#" className="footer-link">
                            Mentions Légales
                        </a>
                        <a href="#" className="footer-link">
                            Politique d’utilisation des cookies
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="#" className="footer-link">
                            Charte de fonctionnement
                        </a>
                        <a href="#" className="footer-link">
                            Politique d’utilisation des cookies
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="https://www.instagram.com/banque.alimentaire22/" className="footer-link">
                            <i className="fab fa-instagram">
                                <span style={{ marginLeft: "10px" }}>Instagram</span>
                            </i>
                        </a>
                        <a href="mailto:ba220@banquealimentaire.org" className="footer-link">
                            ba220@banquealimentaire.org
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
