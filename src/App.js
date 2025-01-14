"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const checkConnection = async () => {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          getAccountBalance(accounts[0]);
          console.log("Already connected account:", accounts[0]);
        } else {
          setIsConnected(false);
        }
      };
      checkConnection();
    }
  }, []);

  const getAccountBalance = async (accountAddress) => {
    if (window.ethereum && accountAddress) {
      try {
        const balanceInWei = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accountAddress, "latest"],
        });
        const balanceInEth = parseFloat(balanceInWei) / Math.pow(10, 18);
        setBalance(balanceInEth.toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      alert("MetaMask is not installed or unavailable");
    }
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        setIsConnected(true);
        getAccountBalance(accounts[0]);
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("User rejected connection:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Connexion à MetaMask</h1>
      <button
        onClick={connectToMetaMask}
        style={{ padding: "10px 20px", marginBottom: "10px" }}
      >
        Se connecter à MetaMask
      </button>
      <p>Status : {isConnected ? "Connecté" : "Non connecté"}</p>
      {/* <p>Compte connecté : {account || "Aucun"}</p> */}
      <button
        onClick={() => getAccountBalance(account)}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Obtenir le solde
      </button>
      <p>Solde : {balance ? `${balance} ETH` : "Non disponible"}</p>
    </div>
  );
}
