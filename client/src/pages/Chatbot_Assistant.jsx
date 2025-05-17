import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ChatBubbleOutline } from "@mui/icons-material";
import { Box, Typography, Fab } from "@mui/material";

const faqs = [
  {
    question: "What is Blockchain, and how does it work?",
    answer:
      "Blockchain is a decentralized, digital ledger that records transactions securely and transparently. It works by storing data in immutable blocks linked through cryptographic hashes, ensuring integrity and tamper resistance.",
  },
  {
    question: "What are the advantages of using Blockchain in fundraising?",
    answer:
      "Blockchain enables secure, transparent, and borderless transactions. It reduces intermediaries, cuts costs, and ensures real-time tracking of funds, building trust among investors and donors.",
  },
  {
    question: "How does BlockFunder help crowdfunding campaigns in Bangladesh?",
    answer:
      "BlockFunder provides a transparent and decentralized platform for fundraising in Bangladesh. Campaigns are recorded on the blockchain, ensuring donors can track how their contributions are utilized without intermediaries.",
  },
  {
    question: "Can I create a fundraising campaign for a local cause in Bangladesh?",
    answer:
      "Yes! BlockFunder allows users to create fundraising campaigns for local projects like education, healthcare, disaster relief, and small businesses, ensuring direct donor engagement with transparent fund allocation.",
  },
  {
    question: "How do I donate to a campaign on BlockFunder?",
    answer:
      "You can donate using your Metamask wallet with cryptocurrency such as Ether. Every transaction is recorded on the blockchain, ensuring transparency and security for both donors and campaign creators.",
  },
  {
    question: "Are there any fees for starting a crowdfunding campaign on BlockFunder?",
    answer:
      "BlockFunder charges a minimal service fee to maintain the network. However, due to blockchain-based automation, our fees are significantly lower than traditional crowdfunding platforms.",
  },
  {
    question: "How does BlockFunder prevent fraud in fundraising campaigns?",
    answer:
      "All transactions are recorded on the blockchain, ensuring transparency. Smart contracts enforce fund usage restrictions, and verified campaigns receive additional security checks to prevent fraudulent activities.",
  },
  {
    question: "Can international donors contribute to Bangladesh-based projects?",
    answer:
      "Yes! BlockFunder supports global donations, allowing donors from anywhere in the world to support projects in Bangladesh without excessive banking fees or intermediaries.",
  },
  {
    question: "What types of projects are supported on BlockFunder?",
    answer:
      "BlockFunder supports projects related to education, healthcare, community development, disaster relief, small businesses, and technology innovation in Bangladesh.",
  },
  {
    question: "How long does it take to withdraw funds from a campaign?",
    answer:
      "Once a campaign reaches its goal or a withdrawal request is made, funds are released based on the smart contract conditions. This ensures secure and structured fund distribution.",
  },
  {
    question: "What is the minimum and maximum amount I can donate?",
    answer:
      "BlockFunder allows micro-donations starting from as low as 0.001 ETH to encourage community participation. There is no strict maximum limit, but large transactions may require verification.",
  },
  {
    question: "Can I receive a tax benefit for donating through BlockFunder in Bangladesh?",
    answer:
      "Currently, tax benefits depend on Bangladesh's financial regulations. BlockFunder is working to integrate government-approved donation tracking for potential tax benefits.",
  },
  {
    question: "How does BlockFunder ensure donations reach the intended cause?",
    answer:
      "Smart contracts automate fund allocation, preventing unauthorized withdrawals. Project milestones can be set to release funds in stages based on campaign progress.",
  },
];

const Chatbot_Assistant = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [chatText, setChatText] = useState("Need help?");

  // Chat text animation loop
  useEffect(() => {
    const texts = ["Ask me anything!", "Need help?", "Chat with me!"];
    let index = 0;
    const interval = setInterval(() => {
      setChatText(texts[index]);
      index = (index + 1) % texts.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Embed Chatbase Chatbot
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "hpXRnHUypnv4SHnBylh1I"; // Your Chatbase bot ID
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  
    // Wait for Chatbase to load, then hide its default button
    setTimeout(() => {
      const chatbaseButton = document.querySelector("iframe[title='Chatbot']");
      if (chatbaseButton) chatbaseButton.style.display = "none";  // Hides default Chatbase button
    }, 2000);  // Give it 2 seconds to ensure it's loaded before hiding
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
   

  useEffect(() => {
    setFilteredFaqs(
      faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#1e1e2d] via-[#23233d] to-[#181a21] text-white"
          : "bg-gradient-to-br from-gray-100 via-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className={`text-4xl font-extrabold ${
            isDarkMode ? "text-[#9b73d3]" : "text-purple-600"
          }`}
        >
          Blockchain Info
        </h1>
        <p
          className={`text-lg mt-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Learn about Blockchain and its use in fundraising through FAQs or chat
          with our assistant!
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-[#57eba3]" : "text-green-600"
          }`}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg cursor-pointer border transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isDarkMode
                  ? `bg-[#2d2d3d] ${
                      activeIndex === index ? "border-[#57eba3]" : "border-[#3a3a4a]"
                    }`
                  : `bg-white ${
                      activeIndex === index ? "border-green-500" : "border-gray-200"
                    }`
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <button
                  className={`ml-2 p-1 rounded-full focus:outline-none ${
                    isDarkMode ? "text-[#57eba3] bg-[#1e1e2d]" : "text-green-600 bg-gray-100"
                  }`}
                >
                  {activeIndex === index ? "-" : "+"}
                </button>
              </h3>
              {activeIndex === index && (
                <p
                  className={`mt-4 pt-4 border-t ${
                    isDarkMode
                      ? "text-gray-300 border-[#3a3a4a]"
                      : "text-gray-600 border-gray-200"
                  }`}
                >
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Floating Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "#57eba3", fontWeight: "bold", mb: 1, opacity: 0.8 }}
        >
          {chatText}
        </Typography>
      </Box>

      <Fab
  color="primary"
  sx={{
    position: "fixed",
    bottom: 16,
    right: 16,
    bgcolor: "#57eba3",
    color: "#fff",
    width: "70px",
    height: "70px",
    opacity: 0, // ⬅️ Makes it invisible
    pointerEvents: "none", // ⬅️ Prevents clicking
  }}
>
  <ChatBubbleOutline sx={{ fontSize: "40px" }} />
</Fab>
    </div>
  );
};

export default Chatbot_Assistant;
