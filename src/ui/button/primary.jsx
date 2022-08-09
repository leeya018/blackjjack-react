import Button from "./";

export default function PrimaryButton({ children, disabled = false, ...rest }) {
  return (
    <Button
      className={`border-4 border-black p-2  rounded-lg ${
        disabled ? "bg-gray-600" : "bg-white "
      }`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
}
