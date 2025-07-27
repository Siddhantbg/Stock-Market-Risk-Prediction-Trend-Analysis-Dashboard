import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { ConnectWallet, useAddress, useBalance, useContract, useTransferToken } from '@thirdweb-dev/react';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import axios from 'axios';

const Loan = () => {
  const [timer, setTimer] = useState(10);
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState('Querying...');
  const [flash, setFlash] = useState(false);
  const [depositAmt, setDepositAmt] = useState(0);
  const [connected, setConnected] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [foundPair, setFoundPair] = useState('USDC - DAI');
  const [estimatedProfit, setEstimatedProfit] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [history, setHistory] = useState([]);

  const walletAddress = useAddress();
  const { data: userUSDCBalance, isLoading: loadingUSDCToken } = useBalance("0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8");
  const { contract } = useContract('0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'); 
  const {
    mutateAsync: transferTokens,
    isLoading: loadingTransferToken,
    error,
  } = useTransferToken(contract);

  const { contract: FLArbitrage } = useContract('0xd85ef7fca7b28a515cc55714A42B2e31aA548e85');
  const { data: readBalance, isLoading: loadingFLArbitrage, error: FLError } = useContractRead(
    FLArbitrage,
    "getBalance",
    ['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'],
  );

  // Handle wallet connection and fetch history
  useEffect(() => {
    setConnected(!!walletAddress);
    
    if (walletAddress) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/loans/history/${walletAddress}`)
        .then((response) => {
          const updatedHistory = response.data.map(item => {
            const date = new Date(item.timestamp);
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            return { date: `${d}/${m}/${y}`, token: item.token, loan: item.loan, pl: item.pl };
          });
          setHistory(updatedHistory);
        })
        .catch((err) => {
          console.error("Failed to fetch loan history:", err);
        });
    }
  }, [walletAddress]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  // Check balance when timer hits zero
  useEffect(() => {
    const init = async () => {
      if (timer === 0) {
        try {
          const bal = await FLArbitrage.call("getBalance", ['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8']);
          setDepositAmt(bal);
          setStatus(bal > 0 ? "Locked" : "Free");
          setTimer(10);
        } catch (err) {
          console.error("Failed to get balance:", err);
          setStatus("Error");
        }
      }
    };
    init();
  }, [timer, FLArbitrage]);

  // Update balance display
  useEffect(() => {
    setBalance(loadingUSDCToken ? 'Loading...' : `${userUSDCBalance?.displayValue || '0'} USDC`);
  }, [loadingUSDCToken, userUSDCBalance]);

  const handleWithdraw = async () => {
    try {
      await FLArbitrage.call("withdraw", ['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8']);
      localStorage.setItem('user', 'passive');
      setStatus('Free');
      setStatusMessage('');
      setFlash(false);
    } catch (err) {
      console.error("Withdrawal failed:", err);
      setStatusMessage('Withdrawal failed');
    }
  };

  const handleArena = async () => {
    try {
      if (loadingTransferToken) {
        alert("Transaction in progress...");
        return;
      }
      await transferTokens({
        to: '0xd85ef7fca7b28a515cc55714A42B2e31aA548e85',
        amount: '5',
      });
      localStorage.setItem('user', 'active');
      setStatus('Locked');
      setStatusMessage('');
    } catch (err) {
      localStorage.setItem('user', 'passive');
      console.error("Arena transaction failed:", err);
      setStatusMessage('Transaction failed');
    }
  }

  const handleStatus = () => {
    try {
      if(depositAmt > 1){
        setStatus('Locked'); 
      }
      else{
        setStatus('Free');
      }
    } catch (error) {
      setStatus('Try Again!');
    }
  }

  const handleFlash = () => {
    
    if(localStorage.getItem('user') === 'passive'){
      return alert("Please lock an arena to get a flash loan!");
    }
    else{
      setFlash(true);
      const profit = 0.10 * loanAmount;
      setStatusMessage('Picking the best arbitrage pair for you...');
      setTimeout(() => {
        setFoundPair('USDC - DAI');
        setEstimatedProfit(`${profit} USDC`);
        setStatusMessage('');
      }, 2000);
    }
  };

  const handleProceed = async () => {
    const amt = loanAmount * (10**6);
    console.log(typeof(amt));
    console.log(amt);

    try {
      await FLArbitrage.call('requestFlashLoan',['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',amt]);
      setStatusMessage('Success, Please withdraw your amount!');
      const date = new Date().toLocaleDateString();
      axios.post('http://localhost:5550/loan/historyWrite',{ 
        address: walletAddress,
        date: date, 
        token: 'USDC', 
        amt: loanAmount,  
        pft: loanAmount*0.1,
      })
      .then((res) => {
        if(res.data.status === "success"){
          alert("success");
          const object = res.data.data[0];
          console.log(object);
          const date = new Date(object.date);
          const d = date.getDate();
          const m = date.getMonth() + 1;
          const y = date.getFullYear();
          const newEntry = { date: `${d}/${m}/${y}`, token: object.token, loan: object.loan, pl: object.pl};
          setHistory([...history, newEntry]);
        }
        else{
          alert('failed to update history');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (error) {
      setStatusMessage('Error');
    }
    // if (isSuccess) {
    //   const newEntry = { date: new Date().toLocaleDateString(), token: 'USDC', loan: loanAmount, pl: '+1.1' };
    //   setHistory([...history, newEntry]);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="w-full sm:w-auto">
            <ConnectWallet 
              theme="dark"
              btnTitle="Connect Wallet"
              className="!bg-gradient-to-r from-emerald-500 to-teal-500 !text-white"
            />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-sm text-gray-400">Required USDC Balance: <span className="text-emerald-500 font-medium">5 USDC</span></div>
            <div className="text-sm text-gray-400">Available USDC Balance: <span className="text-white font-medium">{balance}</span></div>
          </div>
        </div>

        {/* Arenas Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gradient">Flash Loan Arenas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Arena 1 */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Arena 1: USDC-DAI</h3>
                  <p className="text-sm text-gray-400">Next update in: {timer}s</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  status === 'Free' ? 'bg-emerald-500/20 text-emerald-500' :
                  status === 'Locked' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-gray-500/20 text-gray-500'
                }`}>
                  {status}
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleArena}
                  disabled={status !== 'Free' || !connected}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    status === 'Free' && connected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {status === 'Free' ? 'Lock Arena (5 USDC)' : 'Arena Locked'}
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={status !== 'Locked' || !connected}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    status === 'Locked' && connected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Withdraw
                </button>
              </div>
            </div>
            
            {/* Flash Loan Section */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Flash Loan</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Loan Amount (USDC)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    placeholder="Enter amount"
                    disabled={status !== 'Locked'}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Found Pair</label>
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3">
                    {foundPair}
                  </div>
                </div>
                <button
                  onClick={handleProceed}
                  disabled={status !== 'Locked' || !loanAmount}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    status === 'Locked' && loanAmount
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Flash!
                </button>
              </div>
              {statusMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  statusMessage.includes('Success')
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-gray-400 py-3 px-4 border-b border-gray-800">Date</th>
                    <th className="text-left text-gray-400 py-3 px-4 border-b border-gray-800">Token</th>
                    <th className="text-right text-gray-400 py-3 px-4 border-b border-gray-800">Loan Amount</th>
                    <th className="text-right text-gray-400 py-3 px-4 border-b border-gray-800">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="hover:bg-[#2a2a2a] transition-colors">
                      <td className="py-3 px-4 border-b border-gray-800">{item.date}</td>
                      <td className="py-3 px-4 border-b border-gray-800">{item.token}</td>
                      <td className="text-right py-3 px-4 border-b border-gray-800">{item.loan} USDC</td>
                      <td className={`text-right py-3 px-4 border-b border-gray-800 ${
                        item.pl.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                      }`}>
                        {item.pl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              {connected ? "No transaction history yet" : "Connect your wallet to view history"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loan;