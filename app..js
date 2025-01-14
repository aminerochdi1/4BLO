"use client"
import React, { useState } from 'react';
import Web3 from 'web3';

const MetaMaskConnection = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  // Fonction pour se connecter � MetaMask
  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask d�tect�.');

        // Demande l'acc�s au compte
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialisation de Web3 avec le fournisseur de MetaMask
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // R�cup�re le premier compte connect�
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('Compte connect� :', accounts[0]);
      } else {
        alert('Veuillez installer MetaMask pour utiliser cette application.');
        console.log('MetaMask non d�tect�.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion � MetaMask :', error);
    }
  };

  // Fonction pour obtenir le solde du compte connect�
  const getAccountBalance = async () => {
    try {
      if (web3 && account) {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);
        console.log(`Solde : ${balanceEth} ETH`);
      } else {
        alert('Veuillez connecter votre compte MetaMask.');
      }
    } catch (error) {
      console.error('Erreur lors de la r�cup�ration du solde :', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Connexion � MetaMask</h1>
      <button onClick={connectToMetaMask} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        Se connecter � MetaMask
      </button>
      <p>Compte connect� : {account || 'Aucun'}</p>

      <button onClick={getAccountBalance} style={{ padding: '10px 20px', marginTop: '10px' }}>
        Obtenir le solde
      </button>
      <p>Solde : {balance ? `${balance} ETH` : 'Non disponible'}</p>
    </div>
  );
};

export default MetaMaskConnection;