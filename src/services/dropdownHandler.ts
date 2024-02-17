import { syncCryptoBalances } from "./syncCryptoBalances";

let balanceCheckInterval: number | null = null;

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval gestoppt.");
  }
};

export const activateDropdown = (checkAndUpdateBalance: () => void) => {
  // Startet das Intervall und speichert es
  balanceCheckInterval = setInterval(checkAndUpdateBalance, 250);
};

const deactivateDropdown = () => {
  stopBalanceCheckInterval(); // Ruft die Funktion aus cryptoWallet.ts auf, um den Interval zu stoppen
  console.log("Dropdown deaktiviert.");
};

export const dropdownHandler = () => {
  // Füge den Event-Listener hinzu, wenn das Skript geladen wird
  const handleDocumentClick = (event: MouseEvent) => {
    // Annahme: Das Dropdown-Menü oder ein Container hat eine Klasse, die seine Sichtbarkeit steuert
    const dropdown = document.querySelector(
      ".dropdown-scroll-content"
    ) as HTMLElement;
    // Hier könntest du eine zusätzliche Überprüfung einfügen, ob das Dropdown sichtbar ist
    // Zum Beispiel könntest du prüfen, ob dropdown.style.display !== 'none'

    if (dropdown && !dropdown.contains(event.target as Node)) {
      // Überprüfe die Sichtbarkeit, bevor du deaktivierst
      if (dropdownIsVisible(dropdown)) {
        console.log("Innerhalb des Dropdowns geklickt");
        syncCryptoBalances();
      }
    } else {
      console.log("Außerhalb des Dropdowns geklickt");
      deactivateDropdown();
      // Optional: Reaktiviere das Intervall oder andere Logik, falls erforderlich
    }
  };

  function dropdownIsVisible(dropdownElement: HTMLElement) {
    // Implementiere eine Logik, um zu überprüfen, ob das Dropdown-Menü sichtbar ist
    // Dies kann von deiner spezifischen Implementierung abhängen
    return dropdownElement.style.display !== "none"; // Beispiel
  }

  document.addEventListener("click", handleDocumentClick);
};
