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

  async function extractAndApplyMultiplier() {
    await wait_for(
      () => document.querySelectorAll('span[slot="label"]').length >= 4
    );

    const calculators = document.querySelectorAll('span[slot="label"]');
    const fourthCalculator = calculators[3];
    const match = fourthCalculator.textContent?.match(/\(([^)]+)\)/);

    if (match && match[1]) {
      const multiplier = parseFloat(match[1]);
      const firstValue = parseFloat(firstElementOverlay.value);
      const newValue = firstValue * multiplier;

      if (secondElementOverlay) {
        secondElementOverlay.value = newValue.toFixed(8); // Stellen Sie die Genauigkeit nach Bedarf ein
      }
    }
  }

  // Setzen Sie ein Intervall, um den Multiplikator regelmäßig zu überprüfen und anzuwenden
  setInterval(extractAndApplyMultiplier, 200); // Überprüft und aktualisiert den Wert jede Sekunde
};
