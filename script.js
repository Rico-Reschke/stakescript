function setzeGuthaben() {
  // Auswahl des Wallet-Elements
  const wallet = document.querySelector(
    'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
  );
  let aktuellesGuthaben = wallet.textContent;

  // Eingabeaufforderung für neues Guthaben
  let neuesGuthaben = prompt(
    "Bitte neues Guthaben eingeben:",
    aktuellesGuthaben
  );

  if (neuesGuthaben !== null && wallet) {
    // Aktualisieren des Guthabens im <span>-Element
    wallet.textContent = neuesGuthaben;

    console.log("Neues Guthaben gesetzt:", neuesGuthaben);
  } else {
    console.log("Kein neues Guthaben gesetzt oder Elemente nicht gefunden.");
  }
}

setzeGuthaben();

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
    zweitesElternelement.appendChild(zweitesNeuesElement);
  };

  document.addEventListener("click", async (event) => {
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
    updateSecondInputElement(); // Zweites Input-Element bei jeder Änderung aktualisieren
  });

  // Zweites Input-Element initial mit dem Startwert des ersten Elements aktualisieren
  updateSecondInputElement();
}

addVisualOverlay();

/// mathe funktion
let lastMultiplier = null; // Speichert den letzten Multiplikatorwert

const wait_for = (conditional, interval = 100) => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (conditional()) {
        clearInterval(intervalId);
        resolve(true);
      }
    }, interval);
  });
};

const value = "0.005"; // Ursprungswert

async function calculators() {
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
        const originalValue = parseFloat(value);
        const newValue = originalValue * multiplier;
        console.log(newValue.toFixed(5)); // Gibt den neuen Wert aus, wenn sich der Multiplikator geändert hat
      }
    } else {
      console.log(
        "Der Multiplikator konnte nicht in eine Zahl umgewandelt werden."
      );
    }
  } else {
    console.log("Kein Text in Klammern gefunden.");
  }
}

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
