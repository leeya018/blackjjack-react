import Board from "./";

export default function BoardPrimary({ children, ...rest }) {
  return (
    <Board
      className={"border-4  p-2 flex items-center  rounded-lg bg-white"}
      {...rest}
    >
      {children}
    </Board>
  );
}
