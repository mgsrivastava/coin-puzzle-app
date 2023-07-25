import React from "react";
import { motion } from "framer-motion";

const getCoinClass = (coinType) => {
  if (coinType === 1) return "silver-coin";
  if (coinType === 2) return "gold-coin";
  return "empty-coin";
};

const Coin = ({ coinType, action, isSelected }) => {
  const coinClass = getCoinClass(coinType);
  return (
    <motion.div
      className={coinClass}
      animate={{
        scale: isSelected ? [null, 1.2, 1] : 1,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={action}
    ></motion.div>
  );
};

export default Coin;
