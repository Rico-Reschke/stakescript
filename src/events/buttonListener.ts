import { DynamicCurrencyConverter } from "../components/currencyConversion";
import { updateElementValue } from "../services/gameService";
import { disableOverlay, enableOverlay } from "../utils/overlayControl";
import { wait_for } from "../utils/wait_for";

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

      let lastValue = ""; // Initialisieren Sie lastValue mit dem Startwert des Elements oder einem leeren String

      const checkForChanges = () => {
        const inputElement = document.querySelector(
          'input[data-test="profit-input"]'
        ) as HTMLInputElement; // Typecast inputElement to HTMLInputElement
        if (!inputElement) return; // Ensure that the element exists

        const currentValue = inputElement.value;
        if (lastValue !== currentValue) {
          console.log("Wert geändert: ", currentValue);
          lastValue = currentValue; // Update lastValue for the next check
        }
      };

      // Starten Sie das Intervall, um das Element regelmäßig zu überprüfen
      setInterval(checkForChanges, 200); // Überprüfen Sie alle 200 Millisekunden

      await wait_for(
        () =>
          !!document.querySelector(
            ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
          )
      );

      // Nachdem das Ziel-<span>-Element erschienen ist, seinen Inhalt aktualisieren
      const targetSpanElement = document.querySelector(
        ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
      );

      if (targetSpanElement && lastValue) {
        targetSpanElement.textContent = lastValue;
      }
    }
  });
};
