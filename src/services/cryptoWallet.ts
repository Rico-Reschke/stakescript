import { wait_for } from "../utils/wait_for";

export const cryptoWallet = () =>
  wait_for(cryptoWallet).then(() => {
    const userBalanceSpan = document.querySelector(
      'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
    );

    // Abrufen des gespeicherten Betrags aus localStorage
    const storedBitcoinAmount = localStorage.getItem("cryptoBalance");

    if (userBalanceSpan) {
      if (storedBitcoinAmount) {
        // Verwenden des gespeicherten Betrags, wenn vorhanden
        userBalanceSpan.textContent =
          parseFloat(storedBitcoinAmount).toFixed(8);
      } else {
        // Sonst fragen Sie den Benutzer nach einem Betrag
        const bitcoinAmount = prompt(
          "How much Bitcoin do you want to have?",
          "0.00000000"
        );

        if (bitcoinAmount !== null) {
          userBalanceSpan.textContent = parseFloat(bitcoinAmount).toFixed(8);
          localStorage.setItem("cryptoBalance", bitcoinAmount);
        }
      }
    }
  });
