import { globalState } from "./globals";
import { wait_for } from "./wait_for";

export async function firstInputElement() {
  await wait_for(
    () =>
      document.querySelector('input[data-test="input-game-amount"]') !== null
  );
  const elternelement = document.querySelector(
    'input[data-test="input-game-amount"]'
  )?.parentNode;
  document.querySelector('input[data-test="input-game-amount"]')?.remove();

  const firstElementOverlay = document.createElement("input");
  firstElementOverlay.type = "number";
  firstElementOverlay.className = "input spacing-expanded svelte-3axy6s";
  firstElementOverlay.setAttribute("data-test", "input-game-amount");
  firstElementOverlay.value = "0.00000000";
  firstElementOverlay.style.backgroundColor = "#0F212E";
  firstElementOverlay.style.color = "#ffffff";
  elternelement?.appendChild(firstElementOverlay);

  firstElementOverlay.addEventListener("input", () => {
    const btcAmount = parseFloat(firstElementOverlay.value);
    const valueInDollar = btcAmount * globalState.currentBitcoinPriceInDollar;

    const dollarValueDisplay = document.querySelector(
      'div[class="svelte-eh26te"]'
    );
    if (dollarValueDisplay) {
      dollarValueDisplay.textContent = `$${valueInDollar.toFixed(2)}`;
    }
  });
}

firstInputElement();
