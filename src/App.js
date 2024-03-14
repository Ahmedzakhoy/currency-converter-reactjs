// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const BASE_URL = "https://api.frankfurter.app";

export default function App() {
  const [amount, setAmount] = useState(100);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState({
    USD: "United States Dollar",
    INR: "Indian Rupee",
    CAD: "Canadian Dollar",
    EUR: "Euro",
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (fromCur === toCur) return setConverted(amount);
    setIsLoading(true);
    const res = await fetch(
      `${BASE_URL}/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
    );
    const data = await res.json();
    setConverted(data.rates[toCur]);
    setIsLoading(false);
  }

  useEffect(() => {
    async function getAllCurrencies() {
      const res = await fetch(`${BASE_URL}/currencies`);
      const data = await res.json();
      if (data) setAllCurrencies(data);
    }
    getAllCurrencies();
  }, []);

  const selectElements = Object.values(allCurrencies).map((value, i) => (
    <option key={value} value={Object.keys(allCurrencies).at(i)}>
      {value}
    </option>
  ));

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <p>Convert between US Dollar, Canadian Dollar, Indian Rupee and Euro</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
        />
        <select
          value={fromCur}
          onChange={(e) => {
            setConverted("");
            setFromCur(e.target.value);
          }}
          disabled={isLoading}
        >
          {selectElements}
        </select>
        <select
          value={toCur}
          onChange={(e) => {
            setConverted("");
            setToCur(e.target.value);
          }}
          disabled={isLoading}
        >
          {selectElements}
        </select>
        <button type="submit">Convert</button>
      </form>
      <p>
        {converted} {allCurrencies[toCur]}
      </p>
    </div>
  );
}
