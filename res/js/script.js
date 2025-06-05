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
    await converter.setBaseCurrency('USD');

    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const myFromData = $("#from_country_selector").countrySelect("getSelectedCountryData");
        const myToData = $("#to_country_selector").countrySelect("getSelectedCountryData");
        let fromCurrency = myFromData.iso2.toUpperCase();
        let toCurrency = myToData.iso2.toUpperCase();

        converter.currencies.forEach(currency => {
            if (currency.startsWith(fromCurrency)) {
                fromCurrency = currency;
            }

            if (currency.startsWith(toCurrency)) {
                toCurrency = currency;
            }
        });

        console.log(fromCurrency);
        console.log(toCurrency);
        
        const amount = parseFloat(document.getElementById('amount').value);

        try {
            const resultSingle = await converter.convertTo(toCurrency, 1);
            document.getElementById('single-amount').textContent = `1 ${fromCurrency} = ${resultSingle} ${toCurrency}`;
            const result = await converter.convertTo(toCurrency, amount);
            document.getElementById('input-amount').textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        } catch (error) {
            document.getElementById('input-amount').textContent = error.message;
        }
    });
})();

class ThemeManager {
    constructor() {
        this.root = document.documentElement;
        this.initializeTheme();
    }

    initializeTheme() {
        if (!this.root.hasAttribute('data-theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }

        document.querySelectorAll('[data-toggle="theme"]').forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!this.root.hasAttribute('data-theme')) {
                this.root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.root.setAttribute('data-theme', newTheme);
    }
}

document.addEventListener('DOMContentLoaded', () => new ThemeManager());

$("#from_country_selector").countrySelect({
    defaultCountry: "us",
    preferredCountries: ['us', 'gb', 'ca', 'bd'],
    responsiveDropdown: true,
});

$("#to_country_selector").countrySelect({
    defaultCountry: "bd",
    preferredCountries: ['us', 'gb', 'ca', 'bd'],
    responsiveDropdown: true,
});



