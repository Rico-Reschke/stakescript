import { globalState } from "./globals";

export function firstInputElement() {
  const elternelement = document.querySelector(
    'input[data-test="input-game-amount"]'
  )?.parentNode;
  document.querySelector('input[data-test="input-game-amount"]')?.remove();

  const elementOverlay = document.createElement("input");
  elementOverlay.type = "number";
  elementOverlay.className = "input spacing-expanded svelte-3axy6s";
  elementOverlay.setAttribute("data-test", "input-game-amount");
  elementOverlay.value = "0.00000000"; // Startwert
  elementOverlay.style.backgroundColor = "#0F212E";
  elementOverlay.style.color = "#ffffff";
  elternelement?.appendChild(elementOverlay);

  const btcAmount = parseFloat(elementOverlay.value); // Der vom Benutzer eingegebene Bitcoin-Betrag
  const valueInDollar = btcAmount * globalState.currentBitcoinPriceInDollar; // Berechnung des Dollarwerts

  // Finde das <div> Element, das den Dollarwert anzeigen soll
  const dollarValueDisplay = document.querySelector(
    'div[class="svelte-eh26te"]'
  );
  if (dollarValueDisplay) {
    dollarValueDisplay.textContent = `$${valueInDollar.toFixed(2)}`; // Aktualisiere den Text des Elements mit dem berechneten Wert
  }
}
