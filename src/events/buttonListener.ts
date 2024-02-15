import { DynamicCurrencyConverter } from "../components/currencyConversion";
import { updateElementValue } from "../services/gameService";
import { disableOverlay, enableOverlay } from "../utils/overlayControl";
import { winOverlay } from "../winOverlay";

export const setupDelegatedButtonListener = () => {
  document.body.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;
    const targetElement = event.target.closest("button");

    if (targetElement && targetElement.dataset.test === "bet-button") {
      console.log("Bet button clicked");

      disableOverlay('input[data-test="input-game-amount"]'); // Verwendung der disableOverlay Funktion

      await updateElementValue();
      // Stellen Sie sicher, dass das zweite Element aktualisiert wurde, bevor Sie den Dollar-Wert aktualisieren
      new DynamicCurrencyConverter(
        'input[data-test="profit-input"]',
        "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
      );

      const intervalId = setInterval(() => {
        const betButton = document.querySelector(
          'button[data-test="bet-button"]'
        );
        if (betButton && !betButton.hasAttribute("disabled")) {
          enableOverlay('input[data-test="input-game-amount"]'); // Verwendung der enableOverlay Funktion
          clearInterval(intervalId); // Stoppt das Intervall, wenn nicht mehr benötigt
        }
      }, 500); // Überprüfen alle 500ms
    } else if (
      targetElement &&
      targetElement.dataset.test === "cashout-button"
    ) {
      console.log("Cashout button clicked");
      winOverlay();
    }
  });
};
