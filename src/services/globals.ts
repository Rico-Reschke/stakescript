export const globalState = {
  currentBitcoinPriceInDollar: 46491, // Beispiel für eine globale Variable
};

export function updateBitcoinPrice(price: number) {
  globalState.currentBitcoinPriceInDollar = price;
}
