import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "./abi/abi.json";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [tickets, setTickets] = useState(0);
  const [id, setId] = useState(0);

  const reloadPage = async () => {
    await getId();
    await Ntickets();
  };
  const getId = async () => {
    const contract = new ethers.Contract(
      "0x6F7CA49667755C73a847C43c662d2121F1e5C225",
      abi,
      provider
    );
    const temId = await contract.prize();
    console.log(temId.toString());
    setId(temId);
  };
  const Ntickets = async () => {
    const contract = new ethers.Contract(
      "0x6F7CA49667755C73a847C43c662d2121F1e5C225",
      abi,
      provider
    );
    const temTickets = await contract.s_randomWords(1);
    console.log(temTickets.toString());
    setTickets(temTickets);
  };
  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("good");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      console.log(provider);
      setAccount(accounts[0]);
    } else {
      console.log("install metamask");
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <img src={require("./assets/images/logo.png")} className="logo" />
        <p>{tickets.toString()}</p>
        {account == null ? (
          <button onClick={initConnection} className="button">
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
      <button onClick={reloadPage} className="button">
        Prueba
      </button>
      <p>{id.toString()}</p>
    </div>
  );
}

export default App;
