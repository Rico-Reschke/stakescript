import { setupDelegatedButtonListener } from "./buttonListener";
import { createAndAddInputElement } from "./utils";
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
  setupDelegatedButtonListener();
}

stakeScript();
