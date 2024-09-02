import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState(1); 

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/0a475fc10e2356bb933e3e2f/latest/USD')
      .then(response => {
        const rate = response.data.conversion_rates[selectedCurrency]; 
        setExchangeRate(rate); 
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedCurrency]); 

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); 
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value); 
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>
          Amount in USD:
          <input 
            type="number" 
            value={amount} 
            onChange={handleAmountChange} 
          />
        </label>
      </div>
      <div>
        <label>
          Select Currency:
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="RUB">RUB</option>
            <option value="TRY">TRY</option>
          </select>
        </label>
      </div>
      <div>
        {exchangeRate ? (
          <p>{amount} USD = {(amount * exchangeRate).toFixed(2)} {selectedCurrency}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
