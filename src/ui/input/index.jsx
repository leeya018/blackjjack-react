export default function Input({
  placeholder = "",
  className = "",
  value = 0,
  onChange = () => {},
}) {
  return (
    <input
      type="text"
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
