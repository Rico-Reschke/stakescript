import { BaseCurrencyConverter } from "./components/currencyConversion";
import { setupDelegatedButtonListener } from "./events/buttonListener";
import { createAndAddInputElement } from "./utils/utils";
import { wait_for } from "./utils/wait_for";

export async function stakeScript() {
  // cryptoWallet()
  //   .then(() => {
  //     console.log("Crypto wallet setup completed.");
  //     syncCryptoBalances();
  //   })
  //   .catch((error) => {
  //     console.error("Error setting up crypto wallet:", error);
  //   });

  await wait_for(
    () =>
      document.querySelector('input[data-test="input-game-amount"]') !== null
  );

  const firstParentElement = document.querySelector(
    'input[data-test="input-game-amount"]'
  )?.parentNode;

  if (!(firstParentElement instanceof Element)) {
    throw new Error("First parent element is not an Element");
  }

  const firstExistingElement = document.querySelector(
    'input[data-test="input-game-amount"]'
  );

  if (firstExistingElement) {
    firstExistingElement.remove();
  }

  // Verwenden Sie createAndAddInputElement für das erste Input-Element
  const firstElementOverlay = createAndAddInputElement(firstParentElement, {
    type: "number",
    className: "input spacing-expanded svelte-3axy6s",
    dataTest: "input-game-amount",
    value: "0.00000000", // Startwert
    backgroundColor: "#0F212E",
    color: "#ffffff",
  });

  if (!firstElementOverlay) {
    throw new Error("First element overlay could not be created");
  }

  const CurrencyConversion = new BaseCurrencyConverter(
    ".currency-conversion .svelte-eh26te"
  );

  firstElementOverlay.addEventListener("input", () => {
    const bitcoinAmount = parseFloat(firstElementOverlay.value) || 0;
    CurrencyConversion.updateDisplay(bitcoinAmount);
  });

  setupDelegatedButtonListener();
}

stakeScript();
