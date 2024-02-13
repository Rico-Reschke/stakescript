export function createAndAddInputElement(
  parentElement: Element | null,
  config: {
    type: string;
    className: string;
    dataTest: string;
    value: string;
    backgroundColor: string;
    color: string;
    readOnly?: boolean;
  }
) {
  if (!parentElement) return;

  const inputElement = document.createElement("input");
  inputElement.type = config.type;
  inputElement.className = config.className;
  inputElement.setAttribute("data-test", config.dataTest);
  inputElement.value = config.value;
  inputElement.style.backgroundColor = config.backgroundColor;
  inputElement.style.color = config.color;
  if (config.readOnly !== undefined) inputElement.readOnly = config.readOnly;

  parentElement.appendChild(inputElement);

  return inputElement;
}

export function updateDollarValueDisplay(
  amount: number,
  globalState: { currentBitcoinPriceInDollar: number }
) {
  const dollarValueDisplay = document.querySelector(
    'div[class="svelte-eh26te"]'
  );
  if (dollarValueDisplay) {
    const valueInDollar = amount * globalState.currentBitcoinPriceInDollar;
    dollarValueDisplay.textContent = `$${valueInDollar.toFixed(2)}`;
  }
}
