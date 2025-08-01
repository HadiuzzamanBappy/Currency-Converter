(function() {
    'use strict';

    // --- Configuration ---
    const API_KEY = '7cc7facdee27a82c7bc52de5';
    const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
    
    const COUNTRY_CURRENCY_MAP = {
        'ad': 'EUR', 'ae': 'AED', 'af': 'AFN', 'ag': 'XCD', 'ai': 'XCD', 'al': 'ALL', 'am': 'AMD', 'ao': 'AOA', 'ar': 'ARS',
        'as': 'USD', 'at': 'EUR', 'au': 'AUD', 'aw': 'AWG', 'ax': 'EUR', 'az': 'AZN', 'ba': 'BAM', 'bb': 'BBD', 'bd': 'BDT',
        'be': 'EUR', 'bf': 'XOF', 'bg': 'BGN', 'bh': 'BHD', 'bi': 'BIF', 'bj': 'XOF', 'bl': 'EUR', 'bm': 'BMD', 'bn': 'BND',
        'bo': 'BOB', 'bq': 'USD', 'br': 'BRL', 'bs': 'BSD', 'bt': 'BTN', 'bv': 'NOK', 'bw': 'BWP', 'by': 'BYN', 'bz': 'BZD',
        'ca': 'CAD', 'cc': 'AUD', 'cd': 'CDF', 'cf': 'XAF', 'cg': 'CDF', 'ch': 'CHF', 'ci': 'XOF', 'ck': 'NZD', 'cl': 'CLP',
        'cm': 'XAF', 'cn': 'CNY', 'co': 'COP', 'cr': 'CRC', 'cu': 'CUP', 'cv': 'CVE', 'cw': 'ANG', 'cx': 'AUD', 'cy': 'EUR',
        'cz': 'CZK', 'de': 'EUR', 'dj': 'DJF', 'dk': 'DKK', 'dm': 'XCD', 'do': 'DOP', 'dz': 'DZD', 'ec': 'USD', 'ee': 'EUR',
        'eg': 'EGP', 'eh': 'MAD', 'er': 'ERN', 'es': 'EUR', 'et': 'ETB', 'fi': 'EUR', 'fj': 'FJD', 'fk': 'FKP', 'fm': 'USD',
        'fo': 'DKK', 'fr': 'EUR', 'ga': 'XAF', 'gb': 'GBP', 'gd': 'XCD', 'ge': 'GEL', 'gf': 'EUR', 'gg': 'GBP', 'gh': 'GHS',
        'gi': 'GIP', 'gl': 'DKK', 'gm': 'GMD', 'gn': 'GNF', 'gp': 'EUR', 'gq': 'XAF', 'gr': 'EUR', 'gs': 'GBP', 'gt': 'GTQ',
        'gu': 'USD', 'gw': 'XOF', 'gy': 'GYD', 'hk': 'HKD', 'hm': 'AUD', 'hn': 'HNL', 'hr': 'EUR', 'ht': 'HTG', 'hu': 'HUF',
        'id': 'IDR', 'ie': 'EUR', 'il': 'ILS', 'im': 'GBP', 'in': 'INR', 'io': 'USD', 'iq': 'IQD', 'ir': 'IRR', 'is': 'ISK',
        'it': 'EUR', 'je': 'GBP', 'jm': 'JMD', 'jo': 'JOD', 'jp': 'JPY', 'ke': 'KES', 'kg': 'KGS', 'kh': 'KHR', 'ki': 'AUD',
        'km': 'KMF', 'kn': 'XCD', 'kp': 'KPW', 'kr': 'KRW', 'kw': 'KWD', 'ky': 'KYD', 'kz': 'KZT', 'la': 'LAK', 'lb': 'LBP',
        'lc': 'XCD', 'li': 'CHF', 'lk': 'LKR', 'lr': 'LRD', 'ls': 'LSL', 'lt': 'EUR', 'lu': 'EUR', 'lv': 'EUR', 'ly': 'LYD',
        'ma': 'MAD', 'mc': 'EUR', 'md': 'MDL', 'me': 'EUR', 'mf': 'EUR', 'mg': 'MGA', 'mh': 'USD', 'mk': 'MKD', 'ml': 'XOF',
        'mm': 'MMK', 'mn': 'MNT', 'mo': 'MOP', 'mp': 'USD', 'mq': 'EUR', 'mr': 'MRU', 'ms': 'XCD', 'mt': 'EUR', 'mu': 'MUR',
        'mv': 'MVR', 'mw': 'MWK', 'mx': 'MXN', 'my': 'MYR', 'mz': 'MZN', 'na': 'NAD', 'nc': 'XPF', 'ne': 'XOF', 'nf': 'AUD',
        'ng': 'NGN', 'ni': 'NIO', 'nl': 'EUR', 'no': 'NOK', 'np': 'NPR', 'nr': 'AUD', 'nu': 'NZD', 'nz': 'NZD', 'om': 'OMR',
        'pa': 'PAB', 'pe': 'PEN', 'pf': 'XPF', 'pg': 'PGK', 'ph': 'PHP', 'pk': 'PKR', 'pl': 'PLN', 'pm': 'EUR', 'pn': 'NZD',
        'pr': 'USD', 'ps': 'ILS', 'pt': 'EUR', 'pw': 'USD', 'py': 'PYG', 'qa': 'QAR', 're': 'EUR', 'ro': 'RON', 'rs': 'RSD',
        'ru': 'RUB', 'rw': 'RWF', 'sa': 'SAR', 'sb': 'SBD', 'sc': 'SCR', 'sd': 'SDG', 'se': 'SEK', 'sg': 'SGD', 'sh': 'SHP',
        'si': 'EUR', 'sj': 'NOK', 'sk': 'EUR', 'sl': 'SLL', 'sm': 'EUR', 'sn': 'XOF', 'so': 'SOS', 'sr': 'SRD', 'ss': 'SSP',
        'st': 'STN', 'sv': 'USD', 'sx': 'ANG', 'sy': 'SYP', 'sz': 'SZL', 'tc': 'USD', 'td': 'XAF', 'tf': 'EUR', 'tg': 'XOF',
        'th': 'THB', 'tj': 'TJS', 'tk': 'NZD', 'tl': 'USD', 'tm': 'TMT', 'tn': 'TND', 'to': 'TOP', 'tr': 'TRY', 'tt': 'TTD',
        'tv': 'AUD', 'tw': 'TWD', 'tz': 'TZS', 'ua': 'UAH', 'ug': 'UGX', 'um': 'USD', 'us': 'USD', 'uy': 'UYU', 'uz': 'UZS',
        'va': 'EUR', 'vc': 'XCD', 've': 'VES', 'vg': 'USD', 'vi': 'USD', 'vn': 'VND', 'vu': 'VUV', 'wf': 'XPF', 'ws': 'WST',
        'ye': 'YER', 'yt': 'EUR', 'za': 'ZAR', 'zm': 'ZMW', 'zw': 'ZWL'
    };


    // --- DOM Elements ---
    const fromCountryEl = $('#from_country');
    const toCountryEl = $('#to_country');
    const amountInput = document.getElementById('amount');
    const swapButton = document.getElementById('swap-currency');
    const resultContainer = document.getElementById('result-container');
    const resultPrimaryEl = document.getElementById('result-primary');
    const resultSecondaryEl = document.getElementById('result-secondary');
    const themeToggleButton = document.getElementById('theme-toggle');

    // --- State ---
    let rates = {};
    let fromCurrency = 'USD';
    let toCurrency = 'BDT';

    // --- Classes ---
    class ExchangeRateService {
        static async fetchRates(baseCurrency) {
            const url = `${API_BASE_URL}/latest/${baseCurrency}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData['error-type'] || 'Network response was not ok');
                }
                const data = await response.json();
                return data.conversion_rates;
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
                throw error;
            }
        }
    }

    class ThemeManager {
        constructor(toggleButton) {
            this.root = document.documentElement;
            this.toggleButton = toggleButton;
            this.init();
        }

        init() {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme) {
                this.setTheme(savedTheme);
            } else {
                this.setTheme(prefersDark ? 'dark' : 'light');
            }

            this.toggleButton.addEventListener('click', () => this.toggleTheme());
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        toggleTheme() {
            const currentTheme = this.root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }

        setTheme(theme) {
            this.root.setAttribute('data-theme', theme);
        }
    }

    // --- Functions ---
    function updateResultUI({ primaryText, secondaryText = '', status = '' }) {
        resultPrimaryEl.textContent = primaryText;
        resultSecondaryEl.textContent = secondaryText;
        resultContainer.className = `converter-footer ${status}`;
    }

    async function performConversion() {
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            updateResultUI({ primaryText: 'Please enter a valid amount.', status: 'warning' });
            return;
        }
        
        updateResultUI({ primaryText: 'Converting...', status: '' });
        
        try {
            rates = await ExchangeRateService.fetchRates(fromCurrency);
            
            const rate = rates[toCurrency];
            if (rate === undefined) {
                throw new Error(`Rate for ${toCurrency} not available.`);
            }

            const totalResult = (amount * rate).toFixed(2);
            const singleUnitRate = rate.toFixed(4);

            updateResultUI({
                primaryText: `${amount.toLocaleString()} ${fromCurrency} = ${parseFloat(totalResult).toLocaleString()} ${toCurrency}`,
                secondaryText: `1 ${fromCurrency} = ${singleUnitRate} ${toCurrency}`,
                status: 'success'
            });

        } catch (error) {
            console.error('Conversion Error:', error);
            let errorMessage = "Could not fetch exchange rates.";
            if (error.message.includes('invalid-key')) {
                errorMessage = "API Key is invalid.";
            } else if (error.message.includes('unsupported-code')) {
                errorMessage = `The currency code ${fromCurrency} is not supported.`;
            }
            updateResultUI({ primaryText: errorMessage, status: 'danger' });
        }
    }
    
    function handleCountryChange() {
        const fromCountryCode = fromCountryEl.countrySelect('getSelectedCountryData').iso2;
        const toCountryCode = toCountryEl.countrySelect('getSelectedCountryData').iso2;

        fromCurrency = COUNTRY_CURRENCY_MAP[fromCountryCode] || 'USD';
        toCurrency = COUNTRY_CURRENCY_MAP[toCountryCode] || 'BDT';
        
        performConversion();
    }
    
    // --- FIX: The swap function is now safer and triggers a single update ---
    function swapCurrencies() {
        // Turn off event listeners to prevent multiple calls
        fromCountryEl.off('change', handleCountryChange);
        toCountryEl.off('change', handleCountryChange);

        const fromCountryCode = fromCountryEl.countrySelect('getSelectedCountryData').iso2;
        const toCountryCode = toCountryEl.countrySelect('getSelectedCountryData').iso2;
        
        // Perform the swap
        fromCountryEl.countrySelect('selectCountry', toCountryCode);
        toCountryEl.countrySelect('selectCountry', fromCountryCode);

        // Manually trigger the update function now that both values are correct
        handleCountryChange();
        
        // Re-attach the event listeners for future user interactions
        fromCountryEl.on('change', handleCountryChange);
        toCountryEl.on('change', handleCountryChange);
    }

    // --- Event Listeners and Initializations ---
    function initialize() {
        new ThemeManager(themeToggleButton);

        const countrySelectOptions = {
            preferredCountries: ['us', 'gb', 'ca', 'in', 'bd'],
            responsiveDropdown: true,
        };

        fromCountryEl.countrySelect({ ...countrySelectOptions, defaultCountry: 'us' });
        toCountryEl.countrySelect({ ...countrySelectOptions, defaultCountry: 'bd' });
        
        amountInput.addEventListener('input', performConversion);
        swapButton.addEventListener('click', swapCurrencies);
        fromCountryEl.on('change', handleCountryChange);
        toCountryEl.on('change', handleCountryChange);

        handleCountryChange();
    }
    
    $(document).ready(initialize);

})();