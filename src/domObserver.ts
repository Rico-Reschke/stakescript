import { createAndAddInputElement } from "./utils";

export function setupDomObserver(firstElementOverlay: { value: string }) {
  const observer = new MutationObserver((mutations, obs) => {
    // Temporäres Deaktivieren des Observers
    obs.disconnect();

    for (const mutation of mutations) {
      // Durchgehen aller hinzugefügten Nodes jeder Mutation
      for (const node of Array.from(mutation.addedNodes)) {
        // Überprüfen, ob das hinzugefügte Node ein Element ist und die erwarteten Kriterien erfüllt
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.matches('input[data-test="profit-input"]')) {
            const parentElement = element.parentNode;

            if (parentElement && parentElement instanceof Element) {
              element.remove(); // Entfernen des existierenden Elements

              // Hinzufügen des neuen Elements
              createAndAddInputElement(parentElement, {
                type: "number",
                className: "input spacing-expanded svelte-3axy6s",
                dataTest: "profit-input",
                value: firstElementOverlay.value,
                backgroundColor: "#2F4553",
                color: "#ffffff",
                readOnly: true,
              });

              // Nachdem die benötigten Aktionen durchgeführt wurden, brechen Sie die Schleife ab
              break;
            }
          }
        }
      }
    }

    // Fortsetzen der Beobachtung
    obs.observe(document.body, { childList: true, subtree: true });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
