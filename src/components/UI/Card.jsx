import "./style/Card.css";

export default function Card({
    children,
    variant = "default", // default, red-accent, blue-accent
    className = "",
    onClick,
    href
}) {
    const cardClasses = `glass-card glass-card--${variant} ${className}`;

    if (href) {
        return (
            <a href={href} className={cardClasses} onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <div className={cardClasses} onClick={onClick}>
            {children}
        </div>
    );
}
