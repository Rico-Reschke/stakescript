export const globalState = {
  currentBitcoinPriceInDollar: 46491, // Beispiel für eine globale Variable
  // Weitere globale Zustände
};

export function updateBitcoinPriceupdateBitcoinPrice(price: number) {
  globalState.currentBitcoinPriceInDollar = price;
}
