import { MESSAGES } from "features/Game";
import PrimaryButton from "@/ui/button/primary";
// import PrimaryButton from "ui/button/primary";
export default function Controls({
  onHit = () => {},
  onStand = () => {},
  onReset = () => {},
  amount = 0,
  dealerCards,
}) {
  function isCardHidden() {
    return dealerCards.find((card) => card.hidden == true);
  }
  return (
    <>
      <div className="controls flex justify-center gap-2">
        <PrimaryButton
          onClick={onHit}
          disabled={amount >= 21 || !isCardHidden()}
        >
          Hit
        </PrimaryButton>
        <PrimaryButton
          onClick={onStand}
          disabled={amount >= 21 || !isCardHidden()}
        >
          Stand
        </PrimaryButton>
        <PrimaryButton onClick={onReset}>Reset</PrimaryButton>
      </div>
    </>
  );
}
