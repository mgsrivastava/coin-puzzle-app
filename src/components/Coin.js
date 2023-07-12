import React from "react";
import { motion } from "framer-motion";

function Coin(props) {
  let { coinType, action, isSelected } = props;
  let coinClass = "empty-coin";
  if (coinType === 1) {
    coinClass = "silver-coin";
  }
  if (coinType === 2) {
    coinClass = "gold-coin";
  }
  return (
    <motion.div
      className={coinClass}
      animate={{
        scale: isSelected ? [null, 1.2, 1] : 1,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={() => {
        action();
      }}
    ></motion.div>
  );
}

export default Coin;
