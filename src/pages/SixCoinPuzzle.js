import "../styles.css";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ArrowKeysReact from "arrow-keys-react";
import Button from "../components/Button";
import Coin from "../components/Coin";

const SixCoinPuzzle = () => {
  const numberOfCoinSlots = 7;
  const startingArray = [1, 1, 1, 0, 2, 2, 2];
  const winningArray = [2, 2, 2, 0, 1, 1, 1];
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
    if (coinTypeArray[coinNumber] !== 0) {
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
    if (coinTypeArray[selectedCoin] === 1) {
      toast.error("cannot move silver coin left", {
        position: "bottom-center",
      });
    } else if (coinTypeArray[leftCoin] === 0) {
      swapCoins(temp, selectedCoin, leftCoin);
    } else if (coinTypeArray[jumpLeftCoin] === 0) {
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
    if (coinTypeArray[selectedCoin] === 2) {
      toast.error("cannot move gold coin right", {
        position: "bottom-center",
      });
    } else if (coinTypeArray[rightCoin] === 0) {
      swapCoins(temp, selectedCoin, rightCoin);
    } else if (coinTypeArray[jumpRightCoin] === 0) {
      swapCoins(temp, selectedCoin, jumpRightCoin);
    } else {
      toast.error("no available space", { position: "bottom-center" });
    }
  };
  const checkCompletion = (array) => {
    if (array.every((val, index) => val === winningArray[index])) {
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
        {[...Array(numberOfCoinSlots).keys()].map((key) => (
          <Coin
            coinType={coinTypeArray[key]}
            action={() => selectCoin(key)}
            id={key}
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
