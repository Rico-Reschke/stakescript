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
  const updateSecondInputElement = async () => {
    await wait_for(
      () => document.querySelector('input[data-test="profit-input"]') !== null
    );

    const secondParentElement = document.querySelector(
      'input[data-test="profit-input"]'
    )?.parentNode;

    if (!(secondParentElement instanceof Element)) {
      throw new Error("Second parent element is not an Element");
    }

    const secondExistingElement = document.querySelector(
      'input[data-test="profit-input"]'
    );

    if (secondExistingElement) {
      secondExistingElement.remove();
    }

    const secondElementOverlay = createAndAddInputElement(secondParentElement, {
      type: "number", // Stellen Sie sicher, dass der Typ korrekt ist, basierend auf Ihrem Anwendungsfall
      className: "input spacing-expanded svelte-3axy6s",
      dataTest: "profit-input", // Stellen Sie sicher, dass der dataTest-Wert korrekt ist, basierend auf Ihrem Anwendungsfall
      value: firstElementOverlay.value, // Wert des ersten Elements verwenden
      backgroundColor: "#2F4553",
      color: "#ffffff",
      readOnly: false, // Basierend auf Ihrem Anwendungsfall
    });

    if (!secondElementOverlay) {
      throw new Error("Second element overlay could not be created");
    }
  };
}

stakeScript();
