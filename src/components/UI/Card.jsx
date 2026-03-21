import "./style/Card.css";

export default function Card({
    children,
    variant = "default", // default, secondary, cyan-accent
    className = "",
    onClick,
    href
}) {
    const cardClasses = `glass-card glass-card--${variant} ${className}`;

    const CardContent = () => (
        <>
            {/* 🤖 HUD SYSTEM CORNERS */}
            <div className="hud-corner-set">
                <div className="hud-corner hud-tl" />
                <div className="hud-corner hud-tr" />
                <div className="hud-corner hud-bl" />
                <div className="hud-corner hud-br" />
            </div>
            {children}
        </>
    );

    if (href) {
        return (
            <a href={href} className={cardClasses} onClick={onClick}>
                <CardContent />
            </a>
        );
    }

    return (
        <div className={cardClasses} onClick={onClick}>
            <CardContent />
        </div>
    );
}
