import "../styles.css";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ArrowKeysReact from "arrow-keys-react";
import Button from "../components/Button";
import Coin from "../components/Coin";
import {
  COIN_SLOTS,
  COIN_TYPES,
  STARTING_ARRAYS,
  WINNING_ARRAY_SEGS,
} from "../constants";

const SixCoinPuzzle = () => {
  const startingArray = Array.from(STARTING_ARRAYS.SIX_COIN);
  const [coinTypeArray, setCoinTypeArray] = useState(startingArray);
  const [selectedCoin, setSelectedCoin] = useState(0);
  const [moveCounter, setMoveCounter] = useState(0);
  const [coinSelectText, setCoinSelectText] = useState(
    "Click to select a coin"
  );

  const swapCoins = (array, index1, index2) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
    setCoinTypeArray(array);
    selectCoin(index2);
    setMoveCounter(moveCounter + 1);
    checkCompletion(array);
  };
  const selectCoin = (coinNumber) => {
    // cannot select empty coins
    if (coinTypeArray[coinNumber] !== COIN_TYPES.EMPTY) {
      setSelectedCoin(coinNumber);
      console.log("selected coin: ", { coinNumber });
      setCoinSelectText("Use arrow keys to move");
    }
  };
  const handleMoveLeft = () => {
    const leftCoin = selectedCoin - 1;
    const jumpLeftCoin = selectedCoin - 2;
    let temp = coinTypeArray;
    // first check that coin is eligible to move left, then either move one space left
    // or jump two spaces left
    if (coinTypeArray[selectedCoin] === COIN_TYPES.SILVER) {
      toast.error("cannot move silver coin left", {
        position: "bottom-center",
      });
    } else if (coinTypeArray[leftCoin] === COIN_TYPES.EMPTY) {
      swapCoins(temp, selectedCoin, leftCoin);
    } else if (coinTypeArray[jumpLeftCoin] === COIN_TYPES.EMPTY) {
      swapCoins(temp, selectedCoin, jumpLeftCoin);
    } else {
      toast.error("no available space", { position: "bottom-center" });
    }
  };
  const handleMoveRight = () => {
    const rightCoin = selectedCoin + 1;
    const jumpRightCoin = selectedCoin + 2;
    let temp = coinTypeArray;
    // first check that coin is eligible to move right, then either move one space right
    // or jump two spaces right
    if (coinTypeArray[selectedCoin] === COIN_TYPES.GOLD) {
      toast.error("cannot move gold coin right", {
        position: "bottom-center",
      });
    } else if (coinTypeArray[rightCoin] === COIN_TYPES.EMPTY) {
      swapCoins(temp, selectedCoin, rightCoin);
    } else if (coinTypeArray[jumpRightCoin] === COIN_TYPES.EMPTY) {
      swapCoins(temp, selectedCoin, jumpRightCoin);
    } else {
      toast.error("no available space", { position: "bottom-center" });
    }
  };
  const checkCompletion = (array) => {
    if (
      array.every((val, index) => val === WINNING_ARRAY_SEGS.SIX_COIN[0][index])
    ) {
      toast.success("Congrats! You've completed the puzzle");
    }
  };
  const resetPuzzle = () => {
    setCoinTypeArray(startingArray);
    setMoveCounter(0);
    setCoinSelectText("Click to select a coin");
  };

  ArrowKeysReact.config({
    left: () => {
      handleMoveLeft();
    },
    right: () => {
      handleMoveRight();
    },
    up: () => {
      toast.error("cannot move up", { position: "bottom-center" });
    },
    down: () => {
      toast.error("cannot move down", { position: "bottom-center" });
    },
  });

  return (
    <div className="coin-puzzle">
      <div className="puzzle-name">Six Coin Puzzle</div>
      <div className="objective-box">
        Move all silver coins to the right side and all gold coins to the left
      </div>
      <div className="rules-box">
        1. Silver coins must move to the right, gold coins must move to the left
        <br></br>
        2. Coins can jump one adjacent coin to land in an empty space
      </div>
      <div className="coin-select-text">
        <p>{coinSelectText}</p>
      </div>
      <div className="coin-array" {...ArrowKeysReact.events} tabIndex="1">
        {[...Array(COIN_SLOTS.SIX_COIN).keys()].map((key) => (
          <Coin
            coinType={coinTypeArray[key]}
            action={() => selectCoin(key)}
            id={key}
            key={key}
            isSelected={key === selectedCoin ? true : false}
          />
        ))}
      </div>
      <div className="puzzle-tools">
        <p>
          <b>Move count: {moveCounter}</b>
        </p>
        <Button title="reset" action={resetPuzzle} />
      </div>
      <Toaster />
    </div>
  );
};

export default SixCoinPuzzle;
