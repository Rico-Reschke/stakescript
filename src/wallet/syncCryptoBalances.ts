import { wait_for } from "../utils/wait_for";

export const syncCryptoBalances = async () => {
  console.log("Waiting for dropdown buttons...");
  await wait_for(
    () => document.querySelectorAll(".button.variant-dropdown").length > 0
  );
  console.log("Dropdown buttons found.");

  let lastCryptoType = "";

  const updateBalancesDisplay = () => {
    console.log("Updating balance displays...");
    const dropdownButtons = document.querySelectorAll(
      ".button.variant-dropdown"
    );

    console.log(`Found ${dropdownButtons.length} dropdown buttons.`);

    dropdownButtons.forEach((button, index) => {
      console.log(`Processing button ${index + 1}/${dropdownButtons.length}`);
      const cryptoType =
        button
          .querySelector('span[title][style="max-width: 16ch;"]')
          ?.getAttribute("title") || null;
      console.log(`Found crypto type: ${cryptoType}`);

      const userBalanceSpan = button.querySelector(
        "span.weight-semibold.line-height-default"
      );

      if (cryptoType && cryptoType !== lastCryptoType) {
        console.log(`Crypto type has changed to: ${cryptoType}`);
        lastCryptoType = cryptoType;
        const storedAmount = localStorage.getItem(
          `cryptoBalance_${cryptoType.toLowerCase()}`
        );
        console.log(`Stored amount for ${cryptoType}: ${storedAmount}`);

        if (userBalanceSpan) {
          userBalanceSpan.textContent = storedAmount
            ? parseFloat(storedAmount).toFixed(8)
            : "0.00000000";
          console.log(`Updated balance for ${cryptoType} to display.`);
        }
      } else {
        console.log(`No change in crypto type or no crypto type found.`);
      }
    });
  };

  updateBalancesDisplay();
};
