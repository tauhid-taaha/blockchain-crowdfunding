import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { FaUsers, FaClock, FaEthereum, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import BkashSuccessModal from "../components/BkashSuccessModal";
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, SocialShare, ProgressBar } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from "../context/AuthContext";

const PopupModal = ({ visible, onClose, details }) => {
  if (!visible) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Payment Request Submitted!</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Username:</strong> {details.username}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Campaign ID:</strong> {details.campaignId}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Bkash Transaction Number:</strong> {details.bkashTxnNumber}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Amount (BDT):</strong> {details.amount}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
const CampaignDetails = () => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
const [modalDetails, setModalDetails] = useState({});
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();
  const { isDarkMode } = useTheme();
const [showModal, setShowModal] = useState(false);
const [txn, setTxn] = useState("");
const [amt, setAmt] = useState("");
const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [showBkash, setShowBkash] = useState(false);
  const [bkashTxn, setBkashTxn] = useState('');
  const [bkashAmount, setBkashAmount] = useState('');
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount); 
    navigate('/');
    setIsLoading(false);
  }

const handleBkashPay = async () => {
  if (!bkashTxn || !bkashAmount) {
    setMessage("Please fill all fields.");
    setMessageType("error");
    return;
  }
  try {
    const res = await axios.post("http://localhost:5173/api/v1/bkash/request", {
      username: user.name,
      campaignId: state.pId,
      bkashTxnNumber: bkashTxn,
    });
    if (res.data.success) {
      // Only now show modal with fresh details
      setModalDetails({
        username: user.name,
        campaignId: state.pId,
        bkashTxnNumber: bkashTxn,
        amount: bkashAmount,
      });
      setModalVisible(true); // Show modal after success

      // Clear input fields and hide form
      setBkashTxn("");
      setBkashAmount("");
      setShowBkash(false);

      setMessage(""); // Clear any previous messages
      setMessageType("");
    } else {
      setMessage("Failed to submit request: " + res.data.message);
      setMessageType("error");
    }
  } catch (error) {
    setMessage("Server error: " + (error.response?.data?.message || error.message));
    setMessageType("error");
  }
};

// Modal close handler
const closeModal = () => {
  setModalVisible(false);
  setModalDetails({}); // Clear details to avoid showing old info
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1c24] to-[#2c2f32]">
      {isLoading && <Loader />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={state.image} 
              alt="campaign" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className={`text-5xl font-bold mb-4 text-white`}>
                {state.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FaClock className="text-white/80" />
                  <span className="text-white/80">{remainingDays} days left</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-white/80" />
                  <span className="text-white/80">{donators.length} backers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEthereum className="text-white/80" />
                  <span className="text-white/80">{state.amountCollected} ETH raised</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#1c1c24]' : 'bg-white'} shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Campaign Progress</h2>
              <ProgressBar current={parseFloat(state.amountCollected)} target={parseFloat(state.target)} />
              <div className="mt-4 flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {state.amountCollected} ETH raised
                </span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Goal: {state.target} ETH
                </span>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#1c1c24]' : 'bg-white'} shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Campaign</h2>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{state.description}</p>
            </motion.div>

            {/* Donators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#1c1c24]' : 'bg-white'} shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Donators</h2>
              <div className="space-y-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <motion.div 
                    key={`${item.donator}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-[#2c2f32]' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <FaUserCircle className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.donator.slice(0, 6)}...{item.donator.slice(-4)}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Donator #{index + 1}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEthereum className="text-purple-400" />
                      <span className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        {item.donation} ETH
                      </span>
                    </div>
                  </motion.div>
                )) : (
                  <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <FaUsers className="text-4xl mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No donators yet. Be the first one!</p>
                    <p className="text-sm mt-2">Your donation can make a difference</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Creator Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#1c1c24]' : 'bg-white'} shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Campaign Creator</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {state.owner.slice(0, 6)}...{state.owner.slice(-4)}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    10 Campaigns Created
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ETH + Bkash Donation Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#1c1c24]' : 'bg-white'} shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Donate to Campaign</h2>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount in ETH"
                  step="0.01"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <CustomButton
                  btnType="button"
                  title="Donate with ETH"
                  styles="w-full bg-purple-600 hover:bg-purple-700"
                  handleClick={handleDonate}
                />
               <CustomButton
  btnType="button"
  title={showBkash ? "Hide Bkash Form" : "Bkash Pay"}
  styles="w-full bg-pink-500 hover:bg-pink-600"
  handleClick={() => setShowBkash(!showBkash)}
/>
     <PopupModal
    visible={modalVisible}
  onClose={closeModal}
  details={modalDetails}
/>
{showBkash && (
  <div className="space-y-4 mt-4">
 <input
  type="text"
  placeholder="Bkash Transaction Number"
  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none text-pink-700 font-bold"
  value={bkashTxn}
  onChange={(e) => setBkashTxn(e.target.value)}
/>

<input
  type="number"
  placeholder="Amount in BDT"
  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none text-pink-700 font-bold"
  value={bkashAmount}
  onChange={(e) => setBkashAmount(e.target.value)}
/>
    <CustomButton
      btnType="button"
      title="Send Bkash Payment Request"
      styles="w-full bg-pink-600 hover:bg-pink-700"
      handleClick={handleBkashPay}
      
    />
  
    {/* Message display for feedback */}
    {message && (
      <p className={`mt-2 text-center ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
        {message}
      </p>
    )}
 

  </div>
)}

                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
