import { updateBalanceDisplay } from "./updateBalanceDisplay";

export const updateWalletBalance = (betAmount: number) => {
  const cryptoTypeElement = document.querySelector(
    'span[title][style="max-width: 16ch;"]'
  );
  const cryptoType = cryptoTypeElement?.getAttribute("title");

  let storedAmount = parseFloat(
    localStorage.getItem(`cryptoBalance_${cryptoType}`) || "0"
  );

  if (storedAmount >= betAmount) {
    storedAmount -= betAmount;
    localStorage.setItem(
      `cryptoBalance_${cryptoType}`,
      storedAmount.toFixed(8)
    );
    console.log(
      `Bet placed: ${betAmount}, new wallet balance: ${storedAmount.toFixed(8)}`
    );
    updateBalanceDisplay(); // Stelle sicher, dass diese Funktion das aktualisierte Guthaben anzeigt
  } else {
    console.error("Insufficient wallet balance. Bet not placed.");
  }
};
