import { wait_for } from "./wait_for";

export async function extractAndApplyMultiplier(
  firstElementOverlay: HTMLInputElement,
  secondElementOverlay: HTMLInputElement
) {
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