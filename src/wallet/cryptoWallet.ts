import { wait_for } from "../utils/wait_for";
import { activateDropdown, dropdownHandler } from "./dropdownHandler";

let balanceCheckInterval: number | null = null; // Stelle sicher, dass dies im oberen Scope deklariert wird

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval gestoppt.");
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
        // Speichere den neuen Wert, falls eine Eingabe erfolgt
        if (storedAmount !== null) {
          // null, wenn der Nutzer die Eingabeaufforderung abbricht
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

  // Initialer Aufruf, um den aktuellen Stand zu setzen
  checkAndUpdateBalance();

  // Regelmäßige Überprüfung, ob die Kryptowährung gewechselt hat
  setInterval(checkAndUpdateBalance, 250); // Überprüfung alle 1000ms (1 Sekunde)
};
