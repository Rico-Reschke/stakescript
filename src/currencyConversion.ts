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

// const dollarValueDisplay = document.querySelector(
//   "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
// );

// // Funktion, die den Wert von secondElementOverlay liest und den Dollarwert aktualisiert
// export function updateDollarValueBasedOnSecondElement(
//   secondElementOverlay: HTMLInputElement
// ) {
//   const secondValue = parseFloat(secondElementOverlay.value) || 0;
//   if (dollarValueDisplay) {
//     (dollarValueDisplay as unknown as currencyConversion).updateDisplay(
//       secondValue
//     );
//   }
// }

// // setInterval, um den Wert regelmäßig zu überprüfen und den Dollarwert zu aktualisieren
// setInterval(updateDollarValueBasedOnSecondElement, 200); // Überprüft alle 200ms
