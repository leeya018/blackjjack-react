import { MESSAGES } from "./";
import PrimaryButton from "@/ui/button/primary";

import BoardSecondary from "@/ui/board/secondary";
import BoardPrimary from "@/ui/board/primary";

import PrimaryInput from "@/ui/input/primary";

export default function Balance({ message, balance, placeBet, bet }) {
  function betValidationCheck() {
    return bet <= balance;
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      {/* balance row */}
      <div className="flex justify-center gap-1">
        <BoardSecondary disabled={true}>{message}</BoardSecondary>
        {/* <div className="button-common"></div> */}
        <BoardPrimary>{balance + "$"}</BoardPrimary>
      </div>
      {/* place the bet  */}
      <div className="flex justify-center gap-1">
        {MESSAGES.bet == message && (
          <>
            <PrimaryInput
              validationCheck={betValidationCheck}
              value={bet}
              onChange={(e) => setBet(e.target.value)}
            />

            <PrimaryButton
              disabled={!betValidationCheck() || message !== MESSAGES.bet}
              onClick={placeBet}
            >
              place the bet
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
}
