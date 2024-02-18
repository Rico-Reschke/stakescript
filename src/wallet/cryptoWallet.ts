import { wait_for } from "../utils/wait_for";
import { activateDropdown, dropdownHandler } from "./dropdownHandler";

let balanceCheckInterval: number | null = null;

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval gestoppt.");
  }
};

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

export const updateBalanceDisplay = () => {
  const cryptoTypeElement = document.querySelector(
    'span[title][style="max-width: 16ch;"]'
  );
  const cryptoType = cryptoTypeElement?.getAttribute("title");

  const userBalanceSpan = document.querySelector(
    'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
  );

  const storedAmount =
    localStorage.getItem(`cryptoBalance_${cryptoType}`) || "0";
  if (userBalanceSpan) {
    userBalanceSpan.textContent = parseFloat(storedAmount).toFixed(8);
    console.log(`Updated display balance: ${storedAmount}`);
  }
};

export const cryptoWallet = async () => {
  await wait_for(
    () => !!document.querySelector('span[title][style="max-width: 16ch;"]')
  );

  const userBalanceSpan = document.querySelector(
    'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
  );

  let lastCryptoType: string | null | undefined = null;

  const checkAndUpdateBalance = () => {
    const cryptoTypeElement = document.querySelector(
      'span[title][style="max-width: 16ch;"]'
    );
    const cryptoType = cryptoTypeElement?.getAttribute("title");

    if (cryptoType !== lastCryptoType) {
      lastCryptoType = cryptoType;

      let storedAmount = localStorage.getItem(`cryptoBalance_${cryptoType}`);

      if (
        !storedAmount ||
        confirm("Möchtest du die Balance manuell aktualisieren?")
      ) {
        storedAmount = prompt(
          `Bitte gib die neue Balance für ${cryptoType} ein:`,
          storedAmount || "0.00000000"
        );
        if (storedAmount !== null) {
          localStorage.setItem(`cryptoBalance_${cryptoType}`, storedAmount);
        }
      }

      if (userBalanceSpan) {
        userBalanceSpan.textContent = parseFloat(storedAmount || "0").toFixed(
          8
        );
      }

      activateDropdown(checkAndUpdateBalance);
      dropdownHandler();
    }
  };

  checkAndUpdateBalance();

  setInterval(checkAndUpdateBalance, 250);
};
