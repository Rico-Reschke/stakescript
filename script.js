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




/// neue funktion testen
/////////////////////////////////////// crack

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

  // Erstes neues Element erstellen
  const neuesElement = document.createElement("input");
  neuesElement.type = "number";
  neuesElement.className = "input spacing-expanded svelte-3axy6s";
  neuesElement.setAttribute("data-test", "input-game-amount");
  neuesElement.value = "0.00000000"; // Startwert
  neuesElement.style.backgroundColor = "#0F212E";
  neuesElement.style.color = "#ffffff";
  elternelement.appendChild(neuesElement);

  // Event Listener für Bet-Button
  document.addEventListener("click", async function (event) {
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
    }
  });

  // Funktion zum Aktualisieren des zweiten Input-Elements
  async function updateSecondInputElement(currentValue) {
    await wait_for(
      () => document.querySelector('input[data-test="profit-input"]') !== null
    );
    const zweitesElternelement = document.querySelector(
      'input[data-test="profit-input"]'
    ).parentNode;
    if (document.querySelector('input[data-test="profit-input"]')) {
      document.querySelector('input[data-test="profit-input"]').remove();
    }

    const zweitesNeuesElement = document.createElement("input");
    zweitesNeuesElement.type = "text";
    zweitesNeuesElement.className = "input spacing-expanded svelte-3axy6s";
    zweitesNeuesElement.setAttribute("data-test", "profit-input");
    zweitesNeuesElement.value = currentValue; // Übergebenen Wert verwenden
    zweitesNeuesElement.style.backgroundColor = "#2F4553";
    zweitesNeuesElement.style.color = "#ffffff";
    zweitesElternelement.appendChild(zweitesNeuesElement);
  }

  // Event Listener für Änderungen am ersten Input-Element
  neuesElement.addEventListener("input", () => {
    updateSecondInputElement(neuesElement.value);
  });

  // Initialer Aufruf, um das zweite Input-Element mit dem Startwert zu erstellen
  updateSecondInputElement(neuesElement.value);
}

addVisualOverlay();
