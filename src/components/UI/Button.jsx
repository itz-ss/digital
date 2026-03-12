import "./style/button.css";

export default function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  children,
  className = "",
}) {
  // If href exists → render link
  if (href) {
    return (
      <a href={href} className={`btn btn-${variant} ${className}`}>
        {children}
      </a>
    );
  }

  // Otherwise render button
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}