import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login");
  
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Signup State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    await loginUser(username, password);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    onClose();
    navigate("/register");
  };

  if (!isOpen) return null;

  return (
    // BACKDROP
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* MODAL CONTAINER */}
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-[#1E1E24] shadow-2xl shadow-purple-900/20 border border-white/10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        
        {/* CLOSE BUTTON (Raw SVG) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* TABS HEADER */}
        <div className="flex border-b border-white/10 px-6 pt-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`mr-6 pb-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "login"
                ? "border-[#AD30DE] text-[#AD30DE]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`pb-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "signup"
                ? "border-[#AD30DE] text-[#AD30DE]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-6">
          
          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#AD30DE] focus:outline-none focus:ring-1 focus:ring-[#AD30DE] transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#AD30DE] focus:outline-none focus:ring-1 focus:ring-[#AD30DE] transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#AD30DE] to-[#E1306C] py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#AD30DE] focus:outline-none focus:ring-1 focus:ring-[#AD30DE] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#AD30DE] focus:outline-none focus:ring-1 focus:ring-[#AD30DE] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#AD30DE] focus:outline-none focus:ring-1 focus:ring-[#AD30DE] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#AD30DE] to-[#E1306C] py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}