import Input from "./";
export default function PrimaryInput({ validationCheck = () => {}, ...rest }) {
  return (
    <Input
      placeholder="place your bet"
      className={`button-common ${
        validationCheck() ? "text-black" : "text-red-600"
      }`}
      {...rest}
    />
  );
}
