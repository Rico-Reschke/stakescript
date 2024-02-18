import { syncCryptoBalances } from "./syncCryptoBalances";

let balanceCheckInterval: number | null = null;

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval stopped.");
  }
};

export const activateDropdown = (checkAndUpdateBalance: () => void) => {
  balanceCheckInterval = setInterval(checkAndUpdateBalance, 250);
};

const deactivateDropdown = () => {
  stopBalanceCheckInterval();
  console.log("Dropdown deaktivated.");
};

export const dropdownHandler = () => {
  const handleDocumentClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(
      ".dropdown-scroll-content"
    ) as HTMLElement;

    if (dropdown && !dropdown.contains(event.target as Node)) {
      if (dropdownIsVisible(dropdown)) {
        console.log("Clicked within the dropdown");
        syncCryptoBalances();
      }
    } else {
      console.log("Clicked outside the dropdown");
      deactivateDropdown();
    }
  };

  function dropdownIsVisible(dropdownElement: HTMLElement) {
    return dropdownElement.style.display !== "none";
  }

  document.addEventListener("click", handleDocumentClick);
};
