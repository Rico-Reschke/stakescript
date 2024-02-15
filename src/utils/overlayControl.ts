export function enableOverlay(selector: any) {
  const element = document.querySelector(selector);
  if (element) element.disabled = false;
}

export function disableOverlay(selector: any) {
  const element = document.querySelector(selector);
  if (element) element.disabled = true;
}
