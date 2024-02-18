import { wait_for } from "../utils/wait_for";
import { activateDropdown, dropdownHandler } from "./dropdownHandler";

let balanceCheckInterval: number | null = null;

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval stopped.");
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
        confirm("Do you want to update the balance manually?")
      ) {
        storedAmount = prompt(
          `Please pass the new balance for ${cryptoType}:`,
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
