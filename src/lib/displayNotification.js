import {Store} from 'react-notifications-component';

async function displayNotification(title, message, type, duration=5000, displayEmoji=true) {
    // Possible types : success / danger / info / default / warning
    let emoji = ""
    if (displayEmoji) {
        switch (type) {
            case "success":
                emoji = "✅ ";
                break;
            case "danger":
                emoji = "❌ ";
                break;
            case "info":
                emoji = "ℹ️ ";
                break;
            case "default":
                emoji = "ℹ️ ";
                break;
            case "warning":
                emoji = "⚠️ ";
                break;
        }
    }

    Store.addNotification({
        title: emoji + title,
        message: message,
        type: type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss:
            {duration: duration, onScreen: true, pauseOnHover: true, showIcon: true}
    });
}

export {displayNotification};