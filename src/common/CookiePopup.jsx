// Importing dependencies
import { CookieManager } from "react-cookie-manager";

const CookiePopup = () => {
    return (
        <div>
            <CookieManager
                displayType="popup"
                showManageButton
                translations={{
                    title: "Cookies",
                    message:
                        "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez choisir ce que vous acceptez.",
                    buttonText: "Tout accepter",
                    declineButtonText: "Tout refuser",
                    manageButtonText: "Uniquement les nécessaires",
                }}
            />
        </div>
    );
}

export default CookiePopup;
