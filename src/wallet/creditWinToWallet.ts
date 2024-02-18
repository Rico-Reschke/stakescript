import { updateBalanceDisplay } from "./updateBalanceDisplay";

export const creditWinToWallet = (winAmount: number) => {
  const cryptoTypeElement = document.querySelector(
    'span[title][style="max-width: 16ch;"]'
  );
  const cryptoType = cryptoTypeElement?.getAttribute("title");

  if (!cryptoType) {
    console.error("Crypto type not found.");
    return;
  }

let storedAmount = parseFloat(
    localStorage.getItem(`cryptoBalance_${cryptoType}`) || "0"
);
storedAmount += winAmount; // Addiere den Gewinnbetrag zum gespeicherten Betrag
localStorage.setItem(`cryptoBalance_${cryptoType}`, storedAmount.toFixed(8));

console.log(
    `Win credited: ${winAmount}, new wallet balance for ${cryptoType}: ${storedAmount.toFixed(
        8
    )}`
);
updateBalanceDisplay(); // Aktualisiere die Anzeige mit dem neuen Guthaben
};
