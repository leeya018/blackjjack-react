import { MESSAGES } from "ui/App";

export default function Balance({ message, balance, placeBet, bet, gameOver }) {
  function betValidationCheck() {
    return bet <= balance;
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      {/* balance row */}
      <div className="flex justify-center gap-1">
        <button className="button-common ">{message}</button>
        <button className="button-common">{balance + "$"}</button>
      </div>
      {/* place the bet  */}
      <div className="flex justify-center gap-1">
        <input
          type="text"
          value={bet}
          className={`button-common ${
            betValidationCheck() ? "text-black" : "text-red-600"
          }`}
          placeholder="place your bet"
          onChange={(e) => setBet(e.target.value)}
        />
        <button
          className={`button-common   disabled:bg-gray-600`}
          disabled={!betValidationCheck() || message !== MESSAGES.bet}
          onClick={placeBet}
        >
          place the bet
        </button>
      </div>
    </div>
  );
}
