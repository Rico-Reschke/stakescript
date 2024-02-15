import { DollarValueUpdater } from "./currencyConversion";
import { updateElementValue } from "./gameService";

export const setupDelegatedButtonListener = () => {
  document.body.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;
    const targetElement = event.target.closest("button");

    if (targetElement && targetElement.dataset.test === "bet-button") {
      console.log("Bet button clicked");
      await updateElementValue();
      // Stellen Sie sicher, dass das zweite Element aktualisiert wurde, bevor Sie den Dollar-Wert aktualisieren
      new DollarValueUpdater(
        'input[data-test="profit-input"]',
        "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
      );
    } else if (
      targetElement &&
      targetElement.dataset.test === "cashout-button"
    ) {
      console.log("Cashout button clicked");
      // Hier könnte weitere Logik stehen
    }
  });
};
