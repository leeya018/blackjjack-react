import Button from "./";

export default function SmallButton({ children, ...rest }) {
  return (
    <Button className="text-sm my-1 mx-4" {...rest}>
      {children}
    </Button>
  );
}
