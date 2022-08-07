export default function Card({ suit, value, hidden }) {
  function getImageSuit() {
    switch (suit) {
      case "spades":
        return { shape: "♠", color: "text-black" };
      case "diamonds":
        return { shape: "♦", color: "text-red-600" };
      case "clubs":
        return { shape: "♣", color: "text-black" };
      case "hearts":
        return { shape: "♥", color: "text-red-600" };

      default:
        return "NONE";
    }
  }

  function getCard() {
    const { shape, color } = getImageSuit();
    if (hidden) {
      return <div className="card bg-red-500 border-white"></div>;
    } else {
      return (
        <div className="relative card flex justify-center items-center">
          <div className={`text-5xl ${color}`}>{value}</div>
          <div className={`absolute top-1 left-3 ${color}`}>{shape}</div>
        </div>
      );
    }
  }

  return <>{getCard()}</>;
}
