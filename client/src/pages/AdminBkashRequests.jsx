import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const statusOptions = ["pending", "verified", "declined"];

const AdminBkashRequests = () => {
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("https://blockchain-crowdfunding-4wah.onrender.com//api/v1/bkash/requests");
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err.message);
      }
    };

    fetchRequests();
  }, []);

  const handleEditChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleConfirm = async (id) => {
    const updated = editing[id];
    if (!updated) return;

    try {
      const res = await axios.put(`https://blockchain-crowdfunding-4wah.onrender.com//api/v1/bkash/request/${id}`, updated);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, ...res.data.updatedRequest } : req))
      );
      setEditing((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#1e293b] text-white px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-extrabold text-center mb-10 text-cyan-400 tracking-wide"
      >
        🛠️ Admin - Manage Bkash Requests
      </motion.h2>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-cyan-600 backdrop-blur-md bg-white/5">
        <table className="w-full text-sm md:text-base text-left text-gray-200">
          <thead className="text-xs md:text-sm uppercase bg-[#1f2937] text-cyan-400">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Txn No</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Etherscan Txn</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Admin Wallet</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const isEditing = editing[req._id];
              return (
                <motion.tr
                  key={req._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-700 hover:bg-cyan-900/10 transition-all"
                >
                  <td className="px-4 py-3 text-pink-300 font-semibold">{req.username}</td>
                  <td className="px-4 py-3 text-green-300 font-semibold">৳{req.confirmedamount}</td>
                  <td className="px-4 py-3 font-mono">{req.bkashTxnNumber}</td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        value={isEditing.status}
                        onChange={(e) => handleEditChange(req._id, "status", e.target.value)}
                        className="bg-gray-800 text-white rounded px-2 py-1"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="font-bold">{req.status.toUpperCase()}</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={isEditing.etherscanTxnId || ""}
                        onChange={(e) => handleEditChange(req._id, "etherscanTxnId", e.target.value)}
                        placeholder="Txn ID"
                        className="bg-gray-800 text-white px-2 py-1 rounded w-40"
                      />
                    ) : req.etherscanTxnId ? (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${req.etherscanTxnId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={isEditing.adminNote || ""}
                        onChange={(e) => handleEditChange(req._id, "adminNote", e.target.value)}
                        placeholder="Note"
                        className="bg-gray-800 text-white px-2 py-1 rounded w-40"
                      />
                    ) : (
                      req.adminNote || "—"
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={isEditing.adminWalletAddress || ""}
                        onChange={(e) => handleEditChange(req._id, "adminWalletAddress", e.target.value)}
                        placeholder="Wallet Address"
                        className="bg-gray-800 text-white px-2 py-1 rounded w-40"
                      />
                    ) : (
                      <span className="text-xs break-all text-purple-300">{req.adminWalletAddress || "—"}</span>
                    )}
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleConfirm(req._id)}
                          className="text-green-400 hover:text-green-300 text-xl"
                          title="Confirm"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() =>
                            setEditing((prev) => {
                              const newState = { ...prev };
                              delete newState[req._id];
                              return newState;
                            })
                          }
                          className="text-red-400 hover:text-red-300 text-xl"
                          title="Cancel"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing((prev) => ({ ...prev, [req._id]: req }))}
                        className="text-yellow-400 hover:text-yellow-300 text-xl"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBkashRequests;
