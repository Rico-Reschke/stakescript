function extractAndApplyMultiplier() {
  const multiplierTextContent =
    document.querySelector(".label-content")?.textContent;
  const multiplierMatch = multiplierTextContent?.match(/\((\d+\.\d+)×\)/);

  if (multiplierMatch && multiplierMatch[1]) {
    const multiplier = parseFloat(multiplierMatch[1]);
    const firstValue = parseFloat(firstElementOverlay.value);
    const newValue = firstValue * multiplier;

    if (secondElementOverlay) {
      secondElementOverlay.value = newValue.toFixed(8); // Stellen Sie die Genauigkeit nach Bedarf ein
    }
  }
}

// Setzen Sie ein Intervall, um den Multiplikator regelmäßig zu überprüfen und anzuwenden
setInterval(extractAndApplyMultiplier, 1000); // Überprüft und aktualisiert den Wert jede Sekunde
