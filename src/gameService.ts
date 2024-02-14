import { createAndAddInputElement } from "./utils";
import { wait_for } from "./wait_for";

export const updateElementValue = async () => {
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

  const firstElementOverlay = document.querySelector(
    'input[data-test="input-game-amount"]'
  ) as HTMLInputElement;

  if (!firstElementOverlay) {
    throw new Error("First element overlay could not be found");
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
