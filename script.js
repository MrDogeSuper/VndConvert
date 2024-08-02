async function fetchExchangeRate() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        return null;
    }
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function convertToUSD() {
    let vndAmount = parseFloat(document.getElementById('vndInput').value.replace(/,/g, ''));
    let rates = await fetchExchangeRate();
    
    // Check if input is a valid number and non-negative, and if rates are fetched successfully
    if (!isNaN(vndAmount) && vndAmount >= 0 && rates !== null && rates.VND) {
        let usdAmount = vndAmount * (1 / rates.VND);
        document.getElementById('usdOutput').textContent = `$${formatNumberWithCommas(usdAmount.toFixed(2))}`;
    } else {
        document.getElementById('usdOutput').textContent = '$0.00';
    }
}

async function convertToVND() {
    let usdAmount = parseFloat(document.getElementById('usdInput').value.replace(/,/g, ''));
    let rates = await fetchExchangeRate();
    
    // Check if input is a valid number and non-negative, and if rates are fetched successfully
    if (!isNaN(usdAmount) && usdAmount >= 0 && rates !== null && rates.VND) {
        let vndAmount = usdAmount * rates.VND;
        document.getElementById('vndOutput').textContent = `₫${formatNumberWithCommas(vndAmount.toFixed(0))}`;
    } else {
        document.getElementById('vndOutput').textContent = '₫0';
    }
}

document.getElementById('vndInput').oninput = function() {
    var value = this.value.replace(/,/g, '').replace(/[^0-9.]/g, '');
    if (value) {
        this.value = formatNumberWithCommas(value);
    }
};

document.getElementById('usdInput').oninput = function() {
    var value = this.value.replace(/,/g, '').replace(/[^0-9.]/g, '');
    if (value) {
        this.value = formatNumberWithCommas(value);
    }
};