import { MESSAGES } from "ui/App";

export default function Controls({
  setControls,
  setBet,
  setBalance,
  controls,
  takeCard,
  stand,
  reset,
  message,
}) {
  return (
    <>
      <div className="controls flex justify-center gap-2">
        <button
          className="button-common disabled:bg-gray-600"
          disabled={controls.hitDisabled}
          onClick={takeCard}
        >
          Hit
        </button>
        <button
          className="button-common disabled:bg-gray-600"
          disabled={controls.standDisabled}
          onClick={stand}
        >
          Stand
        </button>
        <button
          className={`button-common ${
            controls.reset ? "bg-gray-400" : "bg-white"
          }`}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </>
  );
}
