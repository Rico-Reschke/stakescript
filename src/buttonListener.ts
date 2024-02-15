import { currencyConversion } from "./currencyConversion";
import { updateElementValue } from "./gameService";

export const setupDelegatedButtonListener = () => {
  document.body.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;
    const targetElement = event.target.closest("button");

    if (targetElement && targetElement.dataset.test === "bet-button") {
      console.log("Bet button clicked");
      await updateElementValue();
      // Stellen Sie sicher, dass das zweite Element aktualisiert wurde, bevor Sie den Dollar-Wert aktualisieren
      const secondElementOverlay = document.querySelector(
        'input[data-test="profit-input"]'
      ) as HTMLInputElement;

      // Stellen Sie sicher, dass das Element existiert, bevor Sie fortfahren
      if (secondElementOverlay) {
        const dollarConversionInstance = new currencyConversion(
          "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
        );

        // Beobachten Sie den Wert von secondElementOverlay und aktualisieren Sie den Dollarwert
        let lastValue = secondElementOverlay.value;
        setInterval(() => {
          const currentValue = secondElementOverlay.value;
          if (currentValue !== lastValue) {
            const secondValue = parseFloat(currentValue) || 0;
            dollarConversionInstance.updateDisplay(secondValue);
            lastValue = currentValue;
          }
        }, 100); // Überprüfen Sie den Wert alle 200ms
      }
    } else if (
      targetElement &&
      targetElement.dataset.test === "cashout-button"
    ) {
      console.log("Cashout button clicked");
      // Hier könnte weitere Logik stehen
    }
  });
};
