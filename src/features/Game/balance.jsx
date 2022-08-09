import { MESSAGES } from "./";
import PrimaryButton from "@/ui/button/primary";

import BoardSecondary from "@/ui/board/secondary";
import BoardPrimary from "@/ui/board/primary";

export default function Balance({ message, balance, placeBet, bet }) {
  function betValidationCheck() {
    return bet <= balance;
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      {/* balance row */}
      <div className="flex justify-center gap-1">
        <BoardSecondary>{message}</BoardSecondary>
        {/* <div className="button-common"></div> */}
        <BoardPrimary>{balance + "$"}</BoardPrimary>
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
        {/* <button
          className={`button-common   disabled:bg-gray-600`}
          disabled={!betValidationCheck() || message !== MESSAGES.bet}
          onClick={placeBet}
        >
          place the bet
        </button> */}

        <PrimaryButton
          disabled={!betValidationCheck() || message !== MESSAGES.bet}
          onClick={placeBet}
        >
          place the bet
        </PrimaryButton>
      </div>
    </div>
  );
}
