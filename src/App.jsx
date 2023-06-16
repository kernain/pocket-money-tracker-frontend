import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "transactions";
    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "transaction";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, description, datetime, price }),
    });
    const data = await response.json();
    setName("");
    setPrice("");
    setDatetime("");
    setDescription("");
    setTransactions([...transactions, data]);
    console.log(data);
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  return (
    <div className="App">
      <h1>Balance: {balance} PKR.</h1>
      <form onSubmit={addNewTransaction}>
        <div className="info-1">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Apple Iphone 14"
          />
          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="+200 or -200"
          />
        </div>
        <div className="info-2">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Description"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          />
        </div>
        <button type="submit" className="transaction-btn">
          Add new Transaction
        </button>
        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  {transaction.price > 0 ? (
                    <div className="price-green">+{transaction.price}</div>
                  ) : (
                    <div className="price-red">{transaction.price}</div>
                  )}
                  <div className="datetime">
                    {transaction.datetime
                      .replace("T", " ")
                      .replace("Z", "")}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
}

export default App;
