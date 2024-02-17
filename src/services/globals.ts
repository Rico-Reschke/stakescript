export const globalState = {
  currentBitcoinPriceInDollar: 46491,
};

export function updateBitcoinPrice(price: number) {
  globalState.currentBitcoinPriceInDollar = price;
}
