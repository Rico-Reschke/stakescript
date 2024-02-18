export const updateBalanceDisplay = () => {
  const cryptoTypeElement = document.querySelector(
    'span[title][style="max-width: 16ch;"]'
  );
  const cryptoType = cryptoTypeElement?.getAttribute("title");

  const userBalanceSpan = document.querySelector(
    'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
  );

  const storedAmount =
    localStorage.getItem(`cryptoBalance_${cryptoType}`) || "0";
  if (userBalanceSpan) {
    userBalanceSpan.textContent = parseFloat(storedAmount).toFixed(8);
    console.log(`Updated display balance: ${storedAmount}`);
  }
};
