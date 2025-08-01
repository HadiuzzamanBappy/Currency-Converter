class CurrencyConverter {
  async setBaseCurrency(currency) {
    const apiUrl = `https://v6.exchangerate-api.com/v6/7cc7facdee27a82c7bc52de5/latest/${currency.toUpperCase()}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates for ${currency}`);
    }
    const data = await response.json();

    this.rates = data.conversion_rates;
    this.currencies = Object.keys(this.rates);
  }

  async convertTo(currency, amount = 1) {
    const _currency = currency.toUpperCase();
    if (!this.rates[_currency]) {
      throw new Error(`Exchange rate for ${currency} is not available`);
    }
    const result = (this.rates[_currency] * amount).toFixed(2);
    return result;
  }
}

(async () => {
  const converter = new CurrencyConverter();
  await converter.setBaseCurrency("USD");

  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount)) {
    document.getElementById("input-amount").textContent = `No Amount Entered!`;

    document.getElementById("result").classList.add("warning");
  }

  async function performConversion() {
    const myFromData = $("#from_country_selector").countrySelect(
      "getSelectedCountryData"
    );
    const myToData = $("#to_country_selector").countrySelect(
      "getSelectedCountryData"
    );
    let fromCurrency = myFromData.iso2.toUpperCase();
    let toCurrency = myToData.iso2.toUpperCase();

    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount)) {
      document.getElementById(
        "input-amount"
      ).textContent = `No Amount Entered!`;

      document.getElementById("result").classList.add("warning");
      document.getElementById("result").classList.remove("success");
      document.getElementById("result").classList.remove("danger");
    } else {
      converter.currencies.forEach((currency) => {
        if (currency.startsWith(fromCurrency)) {
          fromCurrency = currency;
        }

        if (currency.startsWith(toCurrency)) {
          toCurrency = currency;
        }
      });

      try {
        await converter.setBaseCurrency(fromCurrency);
        const resultSingle = await converter.convertTo(toCurrency, 1);
        document.getElementById(
          "single-amount"
        ).textContent = `1 ${fromCurrency} = ${resultSingle} ${toCurrency}`;
        const result = await converter.convertTo(toCurrency, amount);
        document.getElementById(
          "input-amount"
        ).textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;

        document.getElementById("result").classList.add("success");
        document.getElementById("result").classList.remove("warning");
        document.getElementById("result").classList.remove("danger");
      } catch (error) {
        document.getElementById("input-amount").textContent = error.message;
        document.getElementById("result").classList.remove("success");
        document.getElementById("result").classList.remove("warning");
        document.getElementById("result").classList.add("danger");
      }
    }
  }

  function onTitleChange(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "title"
      ) {
        const newTitle = mutation.target.getAttribute("title");
        console.log("Selected flag title changed to:", newTitle);
        performConversion();
      }
    }
  }

  document.getElementById("amount").addEventListener("input", () => {
    performConversion();
  });

  // Observe changes to the first selected flag's title
  const firstSelectedFlag = document.querySelector(
    "#from_country_selector + .flag-dropdown .selected-flag"
  );
  new MutationObserver(onTitleChange).observe(firstSelectedFlag, {
    attributes: true,
  });

  // Observe changes to the second selected flag's title
  const secondSelectedFlag = document.querySelector(
    "#to_country_selector + .flag-dropdown .selected-flag"
  );
  new MutationObserver(onTitleChange).observe(secondSelectedFlag, {
    attributes: true,
  });

  $("#swap-currency").on("click", () => {
    // Get the current values from both selectors
    const fromSelector = $("#from_country_selector");
    const toSelector = $("#to_country_selector");

    const fromCountry = fromSelector.countrySelect("getSelectedCountryData");
    const toCountry = toSelector.countrySelect("getSelectedCountryData");

    // Swap the countries
    fromSelector.countrySelect("selectCountry", toCountry.iso2);
    toSelector.countrySelect("selectCountry", fromCountry.iso2);

    performConversion();
  });
})();

$("#from_country_selector").countrySelect({
  defaultCountry: "us",
  preferredCountries: ["us", "gb", "ca", "bd"],
  responsiveDropdown: true,
});

$("#to_country_selector").countrySelect({
  defaultCountry: "bd",
  preferredCountries: ["us", "gb", "ca", "bd"],
  responsiveDropdown: true,
});
