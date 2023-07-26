// constants.js

export const COIN_TYPES = {
  EMPTY: 0,
  SILVER: 1,
  GOLD: 2,
};

export const COIN_SLOTS = {
  FIVE_COIN: 17,
  SIX_COIN: 7,
};

export const STARTING_ARRAYS = {
  FIVE_COIN: [0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0],
  SIX_COIN: [1, 1, 1, 0, 2, 2, 2],
};

export const WINNING_ARRAY_SEGS = {
  FIVE_COIN: [
    [2, 2, 1, 1, 1],
    [1, 1, 1, 2, 2],
  ],
  SIX_COIN: [[2, 2, 2, 0, 1, 1, 1]],
};
