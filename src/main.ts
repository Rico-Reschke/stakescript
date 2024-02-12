const currentBitcoinPriceInDollar = 46132; // Beispielwert

const wait_for = (conditional, interval = 100) => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (conditional()) {
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
};

async function addVisualOverlay() {
  function calculateAndDisplayDollarValue() {
    console.log("calculateAndDisplayDollarValue");
    const btcAmount = parseFloat(neuesElement.value); // Der vom Benutzer eingegebene Bitcoin-Betrag
    const valueInDollar = btcAmount * currentBitcoinPriceInDollar; // Berechnung des Dollarwerts

    // Finde das <div> Element, das den Dollarwert anzeigen soll
    const dollarValueDisplay = document.querySelector(
      'div[class="svelte-eh26te"]'
    );
    if (dollarValueDisplay) {
      dollarValueDisplay.textContent = `$${valueInDollar.toFixed(2)}`; // Aktualisiere den Text des Elements mit dem berechneten Wert
    }
  }

  const elternelement = document.querySelector(
    'input[data-test="input-game-amount"]'
  ).parentNode;
  document.querySelector('input[data-test="input-game-amount"]').remove();

  const neuesElement = document.createElement("input");
  neuesElement.type = "number";
  neuesElement.className = "input spacing-expanded svelte-3axy6s";
  neuesElement.setAttribute("data-test", "input-game-amount");
  neuesElement.value = "0.00000000"; // Startwert
  neuesElement.style.backgroundColor = "#0F212E";
  neuesElement.style.color = "#ffffff";
  elternelement.appendChild(neuesElement);

  const updateSecondInputElement = async () => {
    console.log("updateSecondInputElement");
    // Warten, bis das zweite Input-Element bereit ist
    await wait_for(
      () => document.querySelector('input[data-test="profit-input"]') !== null
    );
    const zweitesElternelement = document.querySelector(
      'input[data-test="profit-input"]'
    ).parentNode;

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
    zweitesNeuesElement.value = neuesElement.value; // Wert des ersten Elements verwenden
    zweitesNeuesElement.style.backgroundColor = "#2F4553";
    zweitesNeuesElement.style.color = "#ffffff";
    zweitesNeuesElement.readOnly = true;
    zweitesElternelement.appendChild(zweitesNeuesElement);

    let lastMultiplier = null; // Speichert den letzten Multiplikatorwert
    let lastCalculatedValue = null; // Speichert den zuletzt berechneten Wert für das <span> Element

    function aktualisiereGuthabenBeiGewinn(gewinnInBitcoin) {
      console.log("aktualisiereGuthabenBeiGewinn");
      // Auswahl des Wallet-Elements, das das aktuelle Guthaben anzeigt
      const wallet = document.querySelector(
        'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
      );

      if (!wallet) {
        console.log("Wallet-Element nicht gefunden.");
        return;
      }

      let aktuellesGuthabenInBitcoin = parseFloat(wallet.textContent) || 0;
      console.log(aktuellesGuthabenInBitcoin);

      // Aktualisiere das Guthaben um den Gewinn
      aktuellesGuthabenInBitcoin += gewinnInBitcoin;
      console.log(aktuellesGuthabenInBitcoin);
      // Aktualisieren des Guthabens im Wallet-Element
      wallet.textContent = aktuellesGuthabenInBitcoin.toFixed(8); // Anpassung der Dezimalstellen für Bitcoin
      console.log(wallet.textContent);
    }

    const updateSpanElementWhenAvailable = async () => {
      console.log("updateSpanElementWhenAvailable");
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
      console.log("updateProfitInDollar");
      // Der im zweiten Input-Element angezeigte Wert repräsentiert den Gewinn in Bitcoin
      const profitInBtc = parseFloat(zweitesNeuesElement.value);

      // Berechnung des Gewinns in Dollar
      const profitInDollar = profitInBtc * currentBitcoinPriceInDollar;

      // Finde das <div> Element, das den Gesamtgewinn in Dollar anzeigen soll
      const profitDisplayDiv = document.querySelector(
        "span.label-content.full-width.svelte-1vx6ykn > div.right-align.svelte-5v1hdl > div.currency-conversion.svelte-eh26te > div.svelte-eh26te"
      );
      if (profitDisplayDiv) {
        profitDisplayDiv.textContent = `$${profitInDollar.toFixed(2)}`;
      }
    }

    const calculators = async () => {
      console.log("calculators");

      await wait_for(
        () => document.querySelectorAll('span[slot="label"]').length >= 4
      );

      const calculators = document.querySelectorAll('span[slot="label"]');
      const fourthCalculator = calculators[3];
      const match = fourthCalculator.textContent.match(/\(([^)]+)\)/);
      if (match) {
        const multiplierText = match[1];
        const multiplier = parseFloat(multiplierText);
        if (!isNaN(multiplier)) {
          // Überprüfe, ob sich der Multiplikator seit dem letzten Update geändert hat
          if (multiplier !== lastMultiplier) {
            lastMultiplier = multiplier; // Aktualisiere den gespeicherten letzten Multiplikatorwert
            const originalValue = parseFloat(neuesElement.value); // Bezug auf den aktuellen Wert des ersten Elements
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
      console.log("MutationObserver");
      mutations.forEach((mutation) => {
        if (
          mutation.type === "characterData" ||
          mutation.type === "childList"
        ) {
          calculators(); // Funktion erneut aufrufen, wenn sich der Text ändert
        }
      });
    });

    // Die Beobachtung starten
    const config = { characterData: true, childList: true, subtree: true };
    observer.observe(document.body, config); // Ändern Sie den Zielknoten nach Bedarf

    calculators(); // Erstmaligen Aufruf der Funktion
  };

  document.addEventListener("click", async (event) => {
    console.log("document.addEventListener");
    const isBetButton = event.target.closest('button[data-test="bet-button"]');
    if (isBetButton) {
      neuesElement.disabled = true; // Deaktivieren des Input-Elements sofort
      await wait_for(
        () =>
          document.querySelector(
            'button[data-test="bet-button"][data-test-action-enabled="true"]'
          ) !== null
      );
      neuesElement.disabled = false; // Reaktivieren des Input-Elements

      // Aktualisieren, wenn das Spiel vorbei ist und der "Bet"-Button wieder da ist
      updateSecondInputElement(true); // `true` signalisiert, dass der Spielzyklus neu beginnt
    }
  });

  // Event Listener für Änderungen am ersten Input-Element
  neuesElement.addEventListener("input", () => {
    console.log("neuesElement.addEventListener");
    updateSecondInputElement(); // Zweites Input-Element bei jeder Änderung aktualisieren
    calculateAndDisplayDollarValue();
  });

  // Zweites Input-Element initial mit dem Startwert des ersten Elements aktualisieren
  updateSecondInputElement();
}

addVisualOverlay();
