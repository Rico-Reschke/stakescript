import { globalState } from "./globals";

export class currencyConversion {
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

export class DollarValueUpdater {
  private dollarConversionInstance: currencyConversion;
  private secondElementOverlay: HTMLInputElement;
  private lastValue: string = '';

  constructor(secondElementSelector: string, conversionDisplaySelector: string) {
      this.dollarConversionInstance = new currencyConversion(conversionDisplaySelector);
      const element = document.querySelector(secondElementSelector) as HTMLInputElement;
      if (!element) {
          throw new Error("Second element overlay could not be found");
      }
      this.secondElementOverlay = element;
      this.init();
  }

  private updateDisplay(): void {
      const secondValue = parseFloat(this.secondElementOverlay.value) || 0;
      this.dollarConversionInstance.updateDisplay(secondValue);
      this.lastValue = this.secondElementOverlay.value;
  }

  private init(): void {
      // Aktualisieren Sie den Wert einmalig sofort
      this.updateDisplay();
      // Und dann kontinuierlich überwachen
      setInterval(() => {
          if (this.secondElementOverlay.value !== this.lastValue) {
              this.updateDisplay();
          }
      }, 100);
  }
}