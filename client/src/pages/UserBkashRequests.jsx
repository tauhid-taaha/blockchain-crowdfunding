import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaRegClock, FaExternalLinkAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const statusStyles = {
  pending: "text-yellow-400 border-yellow-400 bg-yellow-900/10",
  verified: "text-green-400 border-green-400 bg-green-900/10",
  declined: "text-red-400 border-red-400 bg-red-900/10",
};

const UserBkashRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/bkash/requests/user/${user.name}`
        );
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error("Error fetching user requests:", err.message);
      }
    };

    if (user?.name) fetchRequests();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#1e293b] text-white px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-pink-400 tracking-wide"
      >
        🚀 My Bkash Payment Requests
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto shadow-xl rounded-xl border border-pink-600 backdrop-blur-md bg-white/5"
      >
        <table className="w-full text-sm md:text-base text-left text-gray-200">
          <thead className="text-xs md:text-sm uppercase bg-[#1f2937] text-pink-400 tracking-wide">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">
                <FaMoneyBillWave className="inline mr-1" /> Amount
              </th>
              <th className="px-6 py-4">Txn No</th>
              <th className="px-6 py-4">Campaign ID</th>
              <th className="px-6 py-4">
                <MdAdminPanelSettings className="inline" /> Admin Wallet
              </th>
              <th className="px-6 py-4">Note</th>
              <th className="px-6 py-4">
                <FaRegClock className="inline" /> Updated
              </th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">
                <FaExternalLinkAlt className="inline" /> Txn
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <motion.tr
                key={req._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                whileHover={{ scale: 1.01 }}
                className="border-b border-gray-700 hover:bg-pink-900/10 transition-all duration-150"
              >
                <td className="px-6 py-4 font-semibold text-pink-300">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-green-300">৳{req.confirmedamount}</td>
                <td className="px-6 py-4 font-mono">{req.bkashTxnNumber}</td>
                <td className="px-6 py-4 text-blue-300">{req.campaignId}</td>
                <td className="px-6 py-4 text-purple-300 text-xs break-all">{req.adminWalletAddress}</td>
                <td className="px-6 py-4 text-red-300 italic">{req.adminNote}</td>
                <td className="px-6 py-4 text-yellow-200">
                  {new Date(req.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full border font-bold text-sm ${statusStyles[req.status]}`}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {req.etherscanTxnId ? (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${req.etherscanTxnId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-200 underline font-medium"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default UserBkashRequests;
