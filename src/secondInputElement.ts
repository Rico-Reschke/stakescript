import { globalState } from "./globals";
import { wait_for } from "./wait_for";

export const secondInputElement = async (elementOverlay: any) => {
  // Warten, bis das zweite Input-Element bereit ist
  await wait_for(
    () => document.querySelector('input[data-test="profit-input"]') !== null
  );
  const zweitesElternelement = document.querySelector(
    'input[data-test="profit-input"]'
  )?.parentNode;

  // Bestehendes Element entfernen, falls vorhanden
  const existierendesElement = document.querySelector(
    'input[data-test="profit-input"]'
  );
  if (existierendesElement) {
    existierendesElement.remove();
  }

  // Neues Element mit aktuellem Wert erstellen
  const zweitesNeuesElement = document.createElement("input");
  zweitesNeuesElement.type = "text";
  zweitesNeuesElement.className = "input spacing-expanded svelte-3axy6s";
  zweitesNeuesElement.setAttribute("data-test", "profit-input");
  zweitesNeuesElement.value = elementOverlay.value; // Wert des ersten Elements verwenden
  zweitesNeuesElement.style.backgroundColor = "#2F4553";
  zweitesNeuesElement.style.color = "#ffffff";
  zweitesNeuesElement.readOnly = true;
  zweitesElternelement?.appendChild(zweitesNeuesElement);

  let lastMultiplier: number | null = null; // Speichert den letzten Multiplikatorwert
  let lastCalculatedValue: string | null = null; // Speichert den zuletzt berechneten Wert für das <span> Element

  function aktualisiereGuthabenBeiGewinn(gewinnInBitcoin: any) {
    // Auswahl des Wallet-Elements, das das aktuelle Guthaben anzeigt
    const wallet = document.querySelector(
      'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
    );

    if (!wallet) {
      console.log("Wallet-Element nicht gefunden.");
      return;
    }

    let aktuellesGuthabenInBitcoin = parseFloat(wallet.textContent || "0") || 0;

    // Aktualisiere das Guthaben um den Gewinn
    aktuellesGuthabenInBitcoin += gewinnInBitcoin;
    // Aktualisieren des Guthabens im Wallet-Element
    wallet.textContent = aktuellesGuthabenInBitcoin.toFixed(8); // Anpassung der Dezimalstellen für Bitcoin
  }

  const updateSpanElementWhenAvailable = async () => {
    await wait_for(
      () =>
        document.querySelector(
          "span[class='weight-bold line-height-default align-center size-default text-size-default variant-success numeric with-icon-space truncate svelte-1d6bfct']"
        ) !== null
    );

    // Nachdem das Element gefunden wurde, aktualisiere seinen Inhalt
    const spanElement = document.querySelector(
      "span[class='weight-bold line-height-default align-center size-default text-size-default variant-success numeric with-icon-space truncate svelte-1d6bfct']"
    );
    if (spanElement && lastCalculatedValue !== null) {
      spanElement.textContent = lastCalculatedValue;
      aktualisiereGuthabenBeiGewinn(parseFloat(lastCalculatedValue));
    }
  };

  function updateProfitInDollar() {
    // Der im zweiten Input-Element angezeigte Wert repräsentiert den Gewinn in Bitcoin
    const profitInBtc = parseFloat(zweitesNeuesElement.value);

    // Berechnung des Gewinns in Dollar
    const profitInDollar =
      profitInBtc * globalState.currentBitcoinPriceInDollar;

    // Finde das <div> Element, das den Gesamtgewinn in Dollar anzeigen soll
    const profitDisplayDiv = document.querySelector(
      "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
    );
    if (profitDisplayDiv) {
      profitDisplayDiv.textContent = `$${profitInDollar.toFixed(2)}`;
    }
  }

  const calculators = async () => {
    await wait_for(
      () => document.querySelectorAll('span[slot="label"]').length >= 4
    );

    const calculators = document.querySelectorAll('span[slot="label"]');
    const fourthCalculator = calculators[3];
    const match = fourthCalculator.textContent?.match(/\(([^)]+)\)/);
    if (match) {
      const multiplierText = match[1];
      const multiplier = parseFloat(multiplierText);
      if (!isNaN(multiplier)) {
        // Überprüfe, ob sich der Multiplikator seit dem letzten Update geändert hat
        if (multiplier !== lastMultiplier) {
          lastMultiplier = multiplier; // Aktualisiere den gespeicherten letzten Multiplikatorwert
          const originalValue = parseFloat(elementOverlay.value); // Bezug auf den aktuellen Wert des ersten Elements
          const newValue = originalValue * multiplier;
          zweitesNeuesElement.value = newValue.toFixed(8); // Aktualisiere den Wert des zweiten Input-Elements
          lastCalculatedValue = newValue.toFixed(8);
          updateSpanElementWhenAvailable();
          updateProfitInDollar();
        }
      } else {
        console.log(
          "Der Multiplikator konnte nicht in eine Zahl umgewandelt werden."
        );
      }
    } else {
      console.log("Kein Text in Klammern gefunden.");
    }
  };

  // MutationObserver und Erstaufruf wie bisher beibehalten
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData" || mutation.type === "childList") {
        calculators(); // Funktion erneut aufrufen, wenn sich der Text ändert
      }
    });
  });

  // Die Beobachtung starten
  const config = { characterData: true, childList: true, subtree: true };
  observer.observe(document.body, config); // Ändern Sie den Zielknoten nach Bedarf

  calculators(); // Erstmaligen Aufruf der Funktion
};
