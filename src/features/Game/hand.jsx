import { v4 as uuidv4 } from "uuid";
import Card from "ui/Card";

export default function Hand({ cards = [], title, amount }) {
  return (
    <div className="dealer">
      {/*  title */}
      <div className="flex justify-center gap-1">
        <h1>{title}</h1>
        <span>({amount})</span>
      </div>
      {/*  cards */}
      <div className="flex justify-center gap-2">
        {cards.map((card) => (
          <Card key={uuidv4()} {...card} />
        ))}
      </div>
    </div>
  );
}
