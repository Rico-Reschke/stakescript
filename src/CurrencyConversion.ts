import { globalState } from "./globals";

export class CurrencyConversion {
  private displayElement: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error("Display element for currency conversion not found");
    }
    this.displayElement = element as HTMLElement;
  }

  public updateDisplay(bitcoinAmount: number): void {
    const dollarValue = bitcoinAmount * globalState.currentBitcoinPriceInDollar;
    this.displayElement.textContent = `$${dollarValue.toFixed(2)}`;
  }
}
