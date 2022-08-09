export default function Button({
  children,
  disabled = false,
  onClick = () => {},
  className,
}) {
  return (
    <button className={`${className}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
