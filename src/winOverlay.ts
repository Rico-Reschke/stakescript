import { wait_for } from "./utils/wait_for";

let lastValue = ""; // Initialisieren Sie lastValue mit dem Startwert des Elements oder einem leeren String

export const winOverlay = async () => {
  const checkForChanges = () => {
    const inputElement = document.querySelector(
      'input[data-test="profit-input"]'
    ) as HTMLInputElement; // Typecast inputElement to HTMLInputElement
    if (!inputElement) return; // Ensure that the element exists

    const currentValue = inputElement.value;
    if (lastValue !== currentValue) {
      console.log("Wert geändert: ", currentValue);
      lastValue = currentValue; // Update lastValue for the next check
    }
  };

  // Starten Sie das Intervall, um das Element regelmäßig zu überprüfen
  setInterval(checkForChanges, 500); // Überprüfen Sie alle 200 Millisekunden

  await wait_for(
    () =>
      !!document.querySelector(
        ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
      )
  );

  // Nachdem das Ziel-<span>-Element erschienen ist, seinen Inhalt aktualisieren
  const targetSpanElement = document.querySelector(
    ".weight-bold.line-height-default.align-center.size-default.text-size-default.variant-success.numeric.with-icon-space.truncate.svelte-1d6bfct"
  );

  if (targetSpanElement && lastValue) {
    targetSpanElement.textContent = lastValue;
  }
};
