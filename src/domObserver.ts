// domObserver.ts
export function setupDOMObserver(callback: any) {
  const observer = new MutationObserver(callback);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Gib eine Funktion zurück, um den Observer zu beenden, falls benötigt
  return () => observer.disconnect();
}
