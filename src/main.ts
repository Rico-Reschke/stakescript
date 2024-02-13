import { setupDomObserver } from "./domObserver";
import { globalState } from "./globals";
import { createAndAddInputElement, updateDollarValueDisplay } from "./utils";
import { wait_for } from "./wait_for";

export async function stakeScript() {
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

  document.querySelector('input[data-test="input-game-amount"]')?.remove();

  // Verwenden Sie createAndAddInputElement für das erste Input-Element
  const firstElementOverlay = createAndAddInputElement(firstParentElement, {
    type: "number",
    className: "input spacing-expanded svelte-3axy6s",
    dataTest: "input-game-amount",
    value: "0.00000000",
    backgroundColor: "#0F212E",
    color: "#ffffff",
  });

  if (!firstElementOverlay) {
    throw new Error("First element overlay could not be created");
  }

  // Event Listener hinzufügen
  firstElementOverlay.addEventListener("input", () => {
    const btcAmount = parseFloat(firstElementOverlay.value);
    // Verwenden Sie updateDollarValueDisplay zum Aktualisieren des Dollar-Wertes
    updateDollarValueDisplay(btcAmount, globalState);
  });

  await wait_for(
    () => document.querySelector('input[data-test="profit-input"]') !== null
  );
  const secondParentElement = document.querySelector(
    'input[data-test="profit-input"]'
  )?.parentNode;

  if (!(secondParentElement instanceof Element)) {
    throw new Error("Second parent element is not an Element");
  }

  // Bestehendes Element entfernen, falls vorhanden
  const existierendesElement = document.querySelector(
    'input[data-test="profit-input"]'
  );
  if (existierendesElement) {
    existierendesElement.remove();
  }

  // Neues Element mit aktuellem Wert erstellen
  const secondElementOverlay = createAndAddInputElement(secondParentElement, {
    type: "number", // Stellen Sie sicher, dass der Typ korrekt ist, basierend auf Ihrem Anwendungsfall
    className: "input spacing-expanded svelte-3axy6s",
    dataTest: "profit-input", // Stellen Sie sicher, dass der dataTest-Wert korrekt ist, basierend auf Ihrem Anwendungsfall
    value: firstElementOverlay.value, // Wert des ersten Elements verwenden
    backgroundColor: "#2F4553",
    color: "#ffffff",
    readOnly: true, // Basierend auf Ihrem Anwendungsfall
  });

  setupDomObserver(firstElementOverlay);

  if (!secondElementOverlay) {
    throw new Error("Second element overlay could not be created");
  }
}

stakeScript();
