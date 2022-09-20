import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "./abi/abi.json";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cost, setcost] = useState(0);
  const [prize, setPrize] = useState(0);
  const Aeth=10**18;

  const reloadPage = async () => {
    await getId();
    await getCost();
  };
  const getId = async () => {
    const contract = new ethers.Contract(
      "0x99C60f65116f63a06F84113c40A769C067D7FBd2",
      abi,
      provider
    );
    const temPrize = await contract.prize()/Aeth;
    console.log(temPrize.toString());
    setPrize(temPrize);
  };
  const getCost = async () => {
    const contract = new ethers.Contract(
      "0x99C60f65116f63a06F84113c40A769C067D7FBd2",
      abi,
      provider
    );
    const temCost = await contract.costTicket()/Aeth;
    console.log(temCost.toString());
    setcost(temCost);
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
        <p>{cost.toString()}</p>
        {account == null ? (
          <button onClick={initConnection} className="button">
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
      <button onClick={reloadPage} className="button">
      </button>
      <p>{prize.toString()}</p>
    </div>
  );
}

export default App;
