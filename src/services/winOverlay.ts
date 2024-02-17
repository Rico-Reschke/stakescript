import { wait_for } from "../utils/wait_for";

let lastValue = ""; // Initialisieren Sie lastValue mit dem Startwert des Elements oder einem leeren String

export const winOverlay = async () => {
  const checkForChanges = () => {
    const inputElement = document.querySelector(
      'input[class="input spacing-expanded svelte-3axy6s"][data-test="profit-input"][style="background-color: rgb(47, 69, 83); color: rgb(255, 255, 255);"]'
    ) as HTMLInputElement; // Typecast inputElement to HTMLInputElement
    if (!inputElement) return; // Ensure that the element exists

    const currentValue = inputElement.value;
    if (lastValue !== currentValue) {
      console.log("Wert geändert: ", currentValue);
      lastValue = currentValue; // Update lastValue for the next check
    }
  };

  setInterval(checkForChanges, 100);

  await wait_for(
    () =>
      !!document.querySelector(
        ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
      )
  );

  const targetSpanElement = document.querySelector(
    ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
  );

  if (targetSpanElement && lastValue) {
    targetSpanElement.textContent = lastValue;
  }
};
