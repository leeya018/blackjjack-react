export default function Board({ children, className, disabled = false }) {
  return (
    <div className={className} disabled={disabled}>
      {children}
    </div>
  );
}
