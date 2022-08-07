import { useState, useEffect } from "react";

import Balance from "@/ui/Balance";
import Controls from "@/ui/Controls";
import Hand from "@/ui/Hand";

import json from "@/cards.json";

export const MESSAGES = Object.freeze({
  bet: "Place a Bet!",
  hitStand: "Hit or Stand?",
  bust: "Bust!",
  userWin: "You Win!",
  dealerWin: "Dealer Wins!",
  tie: "Tie!",
});

export const TITLE = Object.assign({
  player: "player hand",
  dealer: "dealer hand",
});

export default function App({}) {
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState(MESSAGES.bet);

  const [isShuffle, setIsShuffle] = useState(false);

  const [controls, setControls] = useState({
    resetDisabled: false,
    hitDisabled: false,
    standDisabled: false,
  });

  const [deck, setDeck] = useState(json.cards);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerAmount, setDealerAmount] = useState(0);

  const [playerCards, setplayerCards] = useState([]);
  const [playerAmount, setPlayerAmount] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isShuffle) {
      cardsSplit();
    }
  }, [isShuffle]);

  useEffect(() => {
    if (playerCards.length && dealerCards.length) {
      setDealerAmount(calcCardsAmount(dealerCards));
    }
    console.log("render playes cards and dealere cards");
  }, [dealerCards]);

  useEffect(() => {
    let amount = calcCardsAmount(playerCards);
    setPlayerAmount(amount);

    if (amount > 21) {
      setMessage(MESSAGES.bust);
    }
    if (amount >= 21) {
      setControls({ ...controls, hitDisabled: true, standDisabled: true });
    }
    if (amount == 21) {
      stand();
    }
  }, [playerCards]);
  //   useEffect(() => {
  //     if (controls.hit) {
  //       let card = deck[0];
  //       setDeck(deck.slice(1));
  //       setplayerCards([...playerCards, card]);
  //     }
  //   }, [controls.hit]);

  useEffect(() => {
    if (gameOver) {
      checkWin();
    }
  }, [gameOver]);

  //   need to prevent this useEffect that run forever
  //   useEffect(() => {
  //     if (turn.dealer) {
  //       if (dealerAmount < 17) {
  //         setDealerCards([...dealerCards, getCard()]);
  //       }
  //     }
  //   }, [turn, dealerCards]);

  function reset() {
    setControls({
      resetDisabled: false,
      hitDisabled: false,
      standDisabled: false,
    });
    setDeck(json.cards);
    setIsShuffle(false);
    setMessage(MESSAGES.bet);
    setDealerCards([]);
    setDealerAmount(0);
    setplayerCards([]);
    setPlayerAmount(0);
    setGameOver(false);
  }

  function revealCards() {
    let dealerCards_clone = [...dealerCards];
    dealerCards_clone[0].hidden = false;
    setDealerCards(dealerCards_clone);
  }

  function stopBet() {
    setControls({ ...controls, ...{ hitDisabled: true, standDisabled: true } });
  }

  function takeMoreCards() {
    let dealerCards_clone = [...dealerCards];

    while (calcCardsAmount(dealerCards_clone) < 17) {
      dealerCards_clone.push(getCard());
    }
    setDealerCards(dealerCards_clone);
  }

  function checkWin() {
    let playerDiff = 21 - playerAmount;
    let dealerDiff = 21 - dealerAmount;
    if (dealerDiff < 0) {
      setMessage(MESSAGES.userWin);
      return;
    }
    if (dealerDiff < playerDiff) {
      setMessage(MESSAGES.dealerWin);
    } else if (dealerDiff > playerDiff) {
      setMessage(MESSAGES.userWin);
    } else {
      setMessage(MESSAGES.tie);
    }
  }
  function stand() {
    stopBet();
    revealCards();
    takeMoreCards();
    setGameOver(true);
    // this is not the place for check win
    // checkWin();
  }
  function getValue(value) {
    switch (value) {
      case "A":
        return 1;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      default:
        return parseInt(value);
    }
  }

  function getCard() {
    let card = deck[0];
    setDeck(deck.slice(1));
    return card;
  }

  function takeCard() {
    if (canHit()) {
      setplayerCards([...playerCards, getCard()]);
    } else {
      setControls({ ...controls, hitDisabled: true });
    }
  }

  function calcCardsAmount(cards) {
    return cards.reduce((acc, card) => {
      let val = card.hidden ? 0 : getValue(card.value);
      return acc + val;
    }, 0);
  }

  function canHit() {
    return playerAmount < 21;
  }

  function cardsSplit() {
    let [a, b, c, d] = [...deck];
    a.hidden = true;
    setDealerCards([a, b]);
    setplayerCards([c, d]);
    setDeck(deck.slice(4));
  }

  function shuffle() {
    let deck_clone = [...deck];
    for (let i = 0; i < deck_clone.length; i++) {
      for (let j = 0; j < deck_clone.length; j++) {
        let randomInd = Math.floor(Math.random() * deck_clone.length);
        let temp = deck_clone[j];
        deck_clone[j] = deck_clone[randomInd];
        deck_clone[randomInd] = temp;
      }
    }
    console.log(deck_clone);
    setDeck(() => deck_clone);
  }

  function placeBet() {
    setBalance(balance - bet);
    setMessage(MESSAGES.hitStand);
    if (deck) {
      shuffle();
      setIsShuffle(true);
    }
  }

  return (
    <div className="app-game flex flex-col justify-center gap-2">
      {/* balance row */}
      <Balance
        balance={balance}
        message={message}
        setBet={setBet}
        bet={bet}
        placeBet={placeBet}
        gameOver={gameOver}
      />
      {/* controls buttons */}
      {message !== MESSAGES.bet && (
        <>
          <Controls
            reset={reset}
            takeCard={takeCard}
            balance={balance}
            setBet={setBet}
            setControls={setControls}
            controls={controls}
            stand={stand}
            message={message}
          />
          {/* players container */}
          <div className="game flex flex-col items-center">
            {/* dealer hand */}

            <Hand
              cards={dealerCards}
              title={TITLE.dealer}
              amount={dealerAmount}
            />
            {/* player hand */}

            <Hand
              cards={playerCards}
              title={TITLE.player}
              amount={playerAmount}
            />
          </div>
        </>
      )}
    </div>
  );
}
