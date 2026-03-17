import { useEffect } from "react";

// Importing dependencies
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

const CookiePopup = () => {
    useEffect(() => {
        CookieConsent.run({
            autoShow: true,

            cookie: {
                name: 'cookiesRayon22',
                useLocalStorage: true,
            },

            guiOptions: {
                consentModal: {
                    layout: 'cloud inline',
                    position: 'bottom center',
                    equalWeightButtons: true,
                    flipButtons: false
                },
                preferencesModal: {
                    layout: 'box',
                    equalWeightButtons: true,
                    flipButtons: false
                }
            },

            onFirstConsent: ({ cookie }) => {
                console.log('onFirstConsent fired', cookie);
            },

            onConsent: ({ cookie }) => {
                console.log('onConsent fired!', cookie)
            },

            onChange: ({ changedCategories, changedServices }) => {
                console.log('onChange fired!', changedCategories, changedServices);
            },

            onModalReady: ({ modalName }) => {
                console.log('ready:', modalName);
            },

            onModalShow: ({ modalName }) => {
                console.log('visible:', modalName);
            },

            onModalHide: ({ modalName }) => {
                console.log('hidden:', modalName);
            },

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true,
                    // autoClear: {
                    //     cookies: [
                    //         {
                    //             name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    //         },
                    //         {
                    //             name: '_gid',   // string: exact cookie name
                    //         }
                    //     ]
                    // },
                    services: {
                        session: {
                            label: 'Cookies de session',
                            description: 'Test',
                        },
                        cart: {
                            label: 'Cookies de panier',
                        },
                    }
                },
                optionals: {
                    // autoClear: {
                    //     cookies: [
                    //         {
                    //             name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    //         },
                    //         {
                    //             name: '_gid',   // string: exact cookie name
                    //         }
                    //     ]
                    // },
                    services: {
                        stats: {
                            label: 'Cookies statistiques',
                            onAccept: () => { },
                            onReject: () => { }
                        },
                    }
                },
            },

            language: {
                default: 'fr',
                translations: {
                    fr: {
                        consentModal: {
                            title: 'Nous utilisons des cookies',
                            description: "Acceptez-vous l'utilisation de cookies suivant notre politique de confidentialité ?",
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            showPreferencesBtn: 'Gérer les préférences',
                            footer: `<a href="/confidentiality" target="_blank">Politique de confidentialité</a>`,
                        },
                        preferencesModal: {
                            title: 'Gérer les préférences',
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            savePreferencesBtn: 'Accepter la sélection actuelle',
                            closeIconLabel: 'Fermer',
                            serviceCounterLabel: 'Service|Services',
                            sections: [
                                {
                                    title: 'Cookies Rayon22',
                                    description: `Plusieurs catégories de cookies sont utilisées sur ce site, chacune ayant une finalité propre.`,
                                },
                                {
                                    title: 'Cookies nécessaires',
                                    description: 'Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent donc pas être décochés.',

                                    linkedCategory: 'necessary',
                                    cookieTable: {
                                        caption: 'Descriptions',
                                        headers: {
                                            name: 'Cookie',
                                            desc: 'Description'
                                        },
                                        body: [
                                            {
                                                name: 'Cookies de session',
                                                desc: "Les cookies de session servent à identifier l'utilisateur et le maintenir authentifié pendant la navigation.",
                                            },
                                            {
                                                name: 'Cookies de panier',
                                                desc: "Les cookies de panier servent à conserver le contenu du panier pendant la navigation.",
                                            }
                                        ]
                                    }
                                },
                                {
                                    title: 'Cookies optionnels',
                                    linkedCategory: 'optionals',
                                    cookieTable: {
                                        caption: 'Descriptions',
                                        headers: {
                                            name: 'Cookie',
                                            desc: 'Description'
                                        },
                                        body: [
                                            {
                                                name: 'Cookies statistiques',
                                                desc: "Les cookies statistiques servent à obtenir des informations telles que : temps de visite, pages les plus visitées, appareil utilisé pour la connexion...",
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        });
    }, []);
}

export default CookiePopup;
