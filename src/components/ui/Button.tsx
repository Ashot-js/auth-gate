type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  loading?: boolean;
};

export default function Button({ children, variant = "primary", loading, className = "", ...rest }: ButtonProps) {
  return (
    <button className={`ag-btn ag-btn--${variant} ${className}`} disabled={loading || rest.disabled} {...rest}>
      {loading ? "Loading..." : children}
    </button>
  );
}
