import "./style/button.css";
export default function Button({ href, variant = "primary", children }) {
  return (
    <a href={href} className={`btn btn-${variant}`}>
      {children}
    </a>
  );
}
