import { updateElementValue } from "../services/gameService";
import { disableOverlay, enableOverlay } from "../utils/overlayControl";

export function setupBetButtonListener(
  betButtonSelector: any,
  overlaySelector: any
) {
  const betButton = document.querySelector(betButtonSelector);
  betButton.addEventListener("click", async () => {
    disableOverlay(overlaySelector);
    await updateElementValue();

    enableOverlay(overlaySelector);
  });
}
