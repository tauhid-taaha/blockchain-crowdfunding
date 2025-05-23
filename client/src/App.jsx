import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from "./context/ThemeContext";
import AdminRoute from "./components/AdminRoute";
import { Sidebar, Navbar } from "./components";
import WelcomePopup from "./components/WelcomePopup";
import {

  CampaignDetails,
  CreateCampaign,
  Home,
  Profile,
  DonatedCampaignsPage,
  Homepage,
  Chatbot_Assistant,
  Dashboard,
  Register,
  SearchResults,
  Login,
  ChatbotPage,
  BookmarkedCampaigns,
  CryptoRates,
  CryptoNews,
  ForgotPassword,
  ResetPassword,
  BlogList,
  BlogDetail,
  CreateBlog,
  CryptoDashboard,
  UserBkashRequests,
  AdminBkashRequests,
  AdminDashboard,
  AdminLayout,
  AdminValidation,
  VerifyCampaign,
  
} from "./pages";


const App = () => {
  const { user, loading, error } = useAuth();
  const { isDarkMode } = useTheme();
  
  // Redirects to login if user is not authenticated
  const PrivateRoute = ({ children }) => {
    if (loading) {
      return (
        <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    return user ? children : <Navigate to="/login" />;
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative sm:-8 p-4 ${isDarkMode ? 'bg-[#13131a]' : 'bg-gray-100'} min-h-screen flex flex-row`}>
      {/* Welcome Popup */}
      <WelcomePopup />

      {/* Sidebar */}
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-sm:w-full max-w-[1900px] mx-auto sm:pr-5">
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ai" element={<ChatbotPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donated-campaigns" element={<DonatedCampaignsPage />} />
          <Route path="/bookmarks" element={<BookmarkedCampaigns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/chatbot" element={<Chatbot_Assistant />} />
          <Route path="/crypto-rates" element={<CryptoRates />} />
          <Route path="/crypto-dashboard" element={<CryptoDashboard />} />
          <Route path="/crypto-news" element={<CryptoNews />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/verify" element={<VerifyCampaign />} />
            <Route path="/valid" element={<AdminValidation />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/my-bkash-requests" element={<UserBkashRequests />} />
 
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

           <Route path="/admin-bkash-requests" element={ <AdminRoute>
                                                            <AdminBkashRequests />
                                                                     </AdminRoute>} />
          <Route 
            path="/create-blog" 
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
