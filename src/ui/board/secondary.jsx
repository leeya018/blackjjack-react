import Board from "./";

export default function BoardSecondary({ children, ...rest }) {
  return (
    <Board
      className={"border-4 border-green-600 p-8  rounded-lg bg-white"}
      {...rest}
    >
      {children}
    </Board>
  );
}
