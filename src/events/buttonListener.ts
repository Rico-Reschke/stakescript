import { DynamicCurrencyConverter } from "../components/currencyConversion";
import { updateElementValue } from "../services/gameService";
import { winOverlay } from "../services/winOverlay";
import { disableOverlay, enableOverlay } from "../utils/overlayControl";

export const setupDelegatedButtonListener = () => {
  document.body.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;
    const targetElement = event.target.closest("button");

    if (targetElement && targetElement.dataset.test === "bet-button") {
      console.log("Bet button clicked");
      winOverlay();

      disableOverlay('input[data-test="input-game-amount"]');

      await updateElementValue();
      new DynamicCurrencyConverter(
        'input[data-test="profit-input"]',
        "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
      );

      const intervalId = setInterval(() => {
        const betButton = document.querySelector(
          'button[data-test="bet-button"]'
        );
        if (betButton && !betButton.hasAttribute("disabled")) {
          enableOverlay('input[data-test="input-game-amount"]');
          clearInterval(intervalId);
        }
      }, 250);
    } else if (
      targetElement &&
      targetElement.dataset.test === "cashout-button"
    ) {
      console.log("Cashout button clicked");

    }
  });
};
