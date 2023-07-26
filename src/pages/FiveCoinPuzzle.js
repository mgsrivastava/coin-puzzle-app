import "../styles.css";
import React, { useEffect, useState, useCallback } from "react";
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

const areBothCoinsSelected = (coinA, coinB) => {
  if (coinA === -1 || coinB === -1) {
    return false;
  }
  return true;
};

export default function FiveCoinPuzzle() {
  const startingArray = Array.from(STARTING_ARRAYS.FIVE_COIN);
  const [coinTypeArray, setCoinTypeArray] = useState(startingArray);
  const [firstSelectedCoin, setFirstSelectedCoin] = useState(-1);
  const [secondSelectedCoin, setSecondSelectedCoin] = useState(-1);
  const [moveCounter, setMoveCounter] = useState(0);
  const [status, setStatus] = useState("Idle");

  const swapCoins = (array, index1, index2) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
    setCoinTypeArray(array);
    selectCoin(index2);
    checkCompletion(array);
  };

  // useCallback declares a dependency on status
  // This ensures that if status changes, this function will always have the latest
  // status value when it evaluates.
  // If we did not do this, then we could end up with a stale status value inside
  // of the function due to the way JavaScript closures work.
  const getCoinText = useCallback(() => {
    switch (status) {
      case "Idle":
        return "Click to select a coin";
      case "oneSelected":
        return "Click to select second coin";
      case "twoSelected":
        return `Use arrow keys to move coins
        ESC to deselect coins`;
    }
  }, [status]);

  const selectCoin = (coinNumber) => {
    // cannot select empty coins
    if (coinTypeArray[coinNumber] !== COIN_TYPES.EMPTY) {
      if (firstSelectedCoin === -1) {
        setFirstSelectedCoin(coinNumber);
        setStatus("oneSelected");
      } else if (
        secondSelectedCoin === -1 &&
        (coinNumber === firstSelectedCoin - 1 ||
          coinNumber === firstSelectedCoin + 1) &&
        coinTypeArray[coinNumber] !== coinTypeArray[firstSelectedCoin]
      ) {
        setSecondSelectedCoin(coinNumber);
        setStatus("twoSelected");
      } else return;
    }
  };

  const handleMoveLeft = () => {
    if (areBothCoinsSelected(firstSelectedCoin, secondSelectedCoin) === false) {
      toast.error("must select two coins to move", {
        position: "bottom-center",
      });
      return;
    }
    // determine the relative positions of the coins
    const leftCoinIdx = Math.min(firstSelectedCoin, secondSelectedCoin);
    const rightCoinIdx = Math.max(firstSelectedCoin, secondSelectedCoin);
    // only look at the array to the left of the selected coins since they're moving left
    const selectedSegment = coinTypeArray.slice(0, rightCoinIdx + 1);
    // find the nearest empty slots for the coins to move into
    const nearestEmptyIdx = selectedSegment.lastIndexOf(0);
    const nextNearestEmptyIdx = nearestEmptyIdx - 1;
    if (selectedSegment[nextNearestEmptyIdx] === 0) {
      // if the slots are open, move the coins
      swapCoins(coinTypeArray, leftCoinIdx, nextNearestEmptyIdx);
      swapCoins(coinTypeArray, rightCoinIdx, nearestEmptyIdx);
      setFirstSelectedCoin(nextNearestEmptyIdx);
      setSecondSelectedCoin(nearestEmptyIdx);
    } else {
      toast.error("not enough space to move left", {
        position: "bottom-center",
      });
    }
  };
  const handleMoveRight = () => {
    if (areBothCoinsSelected(firstSelectedCoin, secondSelectedCoin) === false) {
      toast.error("must select two coins to move", {
        position: "bottom-center",
      });
      return;
    }
    // determine the relative positions of the coins
    const leftCoinIdx = Math.min(firstSelectedCoin, secondSelectedCoin);
    const rightCoinIdx = Math.max(firstSelectedCoin, secondSelectedCoin);
    // only look at the array to the right of the selected coins
    const selectedSegment = coinTypeArray.slice(leftCoinIdx);
    // find the nearest empty slots for the coins to move into
    // we reverse the array so that we can relate these indices back to the full coinArray
    const selectedSegmentRev = selectedSegment.toReversed();
    const nearestEmptyIdx = selectedSegmentRev.lastIndexOf(0);
    const nextNearestEmptyIdx = nearestEmptyIdx - 1;
    if (selectedSegmentRev[nextNearestEmptyIdx] === 0) {
      // convert indices on the subarray to indices on the full coinArray
      const coinArrayNearestEmpty = coinTypeArray.length - nearestEmptyIdx - 1;
      const coinArrayNextNearestEmpty = coinTypeArray.length - nearestEmptyIdx;
      // move the coins
      swapCoins(coinTypeArray, leftCoinIdx, coinArrayNearestEmpty);
      swapCoins(coinTypeArray, rightCoinIdx, coinArrayNextNearestEmpty);
      setFirstSelectedCoin(coinArrayNearestEmpty);
      setSecondSelectedCoin(coinArrayNextNearestEmpty);
    } else {
      toast.error("not enough space to move right", {
        position: "bottom-center",
      });
    }
  };
  const checkCompletion = () => {
    const arrayString = coinTypeArray.join(",");
    const winningStrings = WINNING_ARRAY_SEGS.FIVE_COIN;
    if (
      arrayString.includes(winningStrings[0].join(",")) ||
      arrayString.includes(winningStrings[1].join(","))
    ) {
      toast.success("Congrats! You've completed the puzzle");
    }
  };
  const deselectCoins = () => {
    setFirstSelectedCoin(-1);
    setSecondSelectedCoin(-1);
    setMoveCounter(moveCounter + 1);
    setStatus("Idle");
  };
  const resetPuzzle = () => {
    setCoinTypeArray(startingArray);
    deselectCoins();
    setMoveCounter(0);
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
  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("user pressed esc, deselecting coins");
      if (event.key === "Escape") {
        event.preventDefault();
        deselectCoins();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div className="coin-puzzle" {...ArrowKeysReact.events}>
      <div className="puzzle-name">Five Coin Puzzle</div>
      <div className="objective-box">
        Arrange the coins in a row sorted by color (e.g.
        Gold-Gold-Silver-Silver-Silver)
      </div>
      <div className="rules-box">
        1. You must move two coins of different colors as a unit<br></br>
        2. Coins must stay in a line and cannot be separated or rotated during
        movement<br></br>
      </div>
      <div className="coin-select-text">
        <p>{getCoinText()}</p>
      </div>
      <div className="coin-array" tabIndex="1">
        {[...Array(COIN_SLOTS.FIVE_COIN).keys()].map((key) => (
          <Coin
            coinType={coinTypeArray[key]}
            action={() => selectCoin(key)}
            id={key}
            key={key}
            isSelected={
              key === firstSelectedCoin || key === secondSelectedCoin
                ? true
                : false
            }
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
}
