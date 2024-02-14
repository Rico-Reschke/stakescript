import { updateElementValue } from "./gameService";

export const setupDelegatedButtonListener = () => {
  document.body.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const targetElement = event.target.closest("button");

    if (targetElement && targetElement.dataset.test === "bet-button") {
      console.log("Bet button clicked");
      updateElementValue();
    } else if (
      targetElement &&
      targetElement.dataset.test === "cashout-button"
    ) {
      console.log("Cashout button clicked");
      // Hier könnte weitere Logik stehen
    }
  });
};
