import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

// Petit composant interne pour gérer la barre de progression
function ProgressBar({ duration }) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percent = Math.max(100 - (elapsed / duration) * 100, 0);
            setProgress(percent);
        }, 50);

        return () => clearInterval(interval);
    }, [duration]);

    return (
        <div
            style={{
                height: "4px",
                width: "100%",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "0 0 6px 6px",
                overflow: "hidden",
                marginTop: "8px",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "rgba(255,255,255,0.9)",
                    transition: "width 50ms linear",
                }}
            ></div>
        </div>
    );
}

// API exportée
function displayNotification(
    title,
    message,
    type = "info",
    duration = 5000
) {
    const backgroundColors = {
        success: "#2ecc71",
        info: "#3498db",
        default: "#3498db",
        warning: "#f1c40f",
        danger: "#e74c3c",
        error: "#e74c3c",
    };

    const textColor = type === "warning" ? "#222" : "#fff";
    const background = backgroundColors[type] ?? "#333";

    toast.custom(
        (t) => (
            <div
                style={{
                    background,
                    color: textColor,
                    padding: "14px 18px",
                    borderRadius: "12px",
                    minWidth: "260px",
                    maxWidth: "350px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    transform: t.visible
                        ? "translateX(0) scale(1)"
                        : "translateX(20px) scale(0.95)",
                    opacity: t.visible ? 1 : 0,
                    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "relative",
                }}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                        position: "absolute",
                        top: "6px",
                        right: "8px",
                        background: "transparent",
                        border: "none",
                        color: textColor,
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    ✕
                </button>

                <div style={{ fontWeight: "bold", fontSize: "15px" }}>{title}</div>
                <div style={{ fontSize: "14px", opacity: 0.95 }}>{message}</div>

                {/* Barre de progression */}
                <ProgressBar duration={duration} />
            </div>
        ),
        { duration }
    );
}

export { displayNotification };
