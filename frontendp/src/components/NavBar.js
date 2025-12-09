// src/components/NavBar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/useAuth";

import {
  Menu,
  LogOut,
  User,
  BookOpen,
  Layers,
  ShoppingCart,
  Home as HomeIcon,
  Ticket,
} from "lucide-react";

function getNavItems(user) {
  if (!user) return [];

  const shared = [
    { text: "Home", path: "/home", icon: <HomeIcon className="w-6 h-6" /> },
    {
      text: "Browse Events",
      path: "/parent-events",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      text: "My Bookings",
      path: "/my-bookings",
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      text: "Cart",
      path: "/cart",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
  ];

  if (user.role === "admin" || user.role === "organiser") {
    return [
      ...shared,
      {
        text: "Manage Events",
        path: "/events",
        icon: <Layers className="w-6 h-6" />,
      },
    ];
  }

  return shared;
}

export default function NavBar({ content }) {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05050a] text-white">
      {/* TOP NAVBAR */}
      <header
        className="fixed inset-x-0 top-0 z-50 bg-black/60 backdrop-blur-lg
                         border-b border-white/5 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                className="p-2 rounded-md hover:bg-white/5 md:hidden transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-white/80" />
              </button>

              <Link to="/" className="flex items-center gap-3">
                {/* Cadencea logo / badge */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ff4da6] flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-extrabold">C</span>
                </div>

                <span className="text-white font-semibold text-lg tracking-wide select-none">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] via-[#c084fc] to-[#ff6b9f]">
                    Cadencea
                  </span>
                </span>
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-2">
              {getNavItems(user).map((item) => (
                <Link
                  to={item.path}
                  key={item.text}
                  className={`relative px-4 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 flex items-center gap-2 transition-all`}
                >
                  {React.cloneElement(item.icon, {
                    className: "w-5 h-5 text-white/70",
                  })}
                  <span className="whitespace-nowrap">{item.text}</span>

                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg,#ad30de,#ff4da6)",
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* RIGHT ICONS */}
            <div className="hidden md:flex gap-3 items-center">
              <Link
                to="/profile"
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="Profile"
              >
                <User className="w-6 h-6 text-[#c4b5fd]" />
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="Logout"
              >
                <LogOut className="w-6 h-6 text-[#fb7185]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#071226] shadow-2xl border-r border-white/5"
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7c3aed] to-[#ff4da6] rounded-xl flex items-center justify-center text-white font-bold">
                  C
                </div>
                <span className="text-white text-lg font-semibold">
                  Cadencea
                </span>
              </div>

              <ul className="p-3 space-y-1">
                {getNavItems(user).map((item) => (
                  <li key={item.text}>
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-[#2a1652] to-[#3b1656] text-white font-medium"
                          : "text-white/90 hover:bg-white/5"
                      } transition-colors`}
                    >
                      {React.cloneElement(item.icon, {
                        className: "w-5 h-5 text-white/80",
                      })}
                      {item.text}
                    </Link>
                  </li>
                ))}

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/30 text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAVBAR */}
      <nav className="md:hidden fixed bottom-4 inset-x-0 z-50 flex justify-center">
        <div className="bg-[#071226]/90 shadow-2xl border border-white/5 rounded-3xl px-6 py-3 flex items-center gap-8">
          {[
            { icon: <HomeIcon />, path: "/home" },
            { icon: <BookOpen />, path: "/browse-events" },
            { icon: <Ticket />, path: "/my-bookings" },
            { icon: <ShoppingCart />, path: "/cart" },
            { icon: <User />, path: "/profile" },
          ].map((item, i) => {
            const active = isActive(item.path);

            return (
              <Link
                to={item.path}
                key={i}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    scale: active ? 1.18 : 1,
                    color: active ? "#b794f4" : "#9ca3af",
                  }}
                  className={`text-white/80`}
                >
                  {React.cloneElement(item.icon, {
                    className: "w-6 h-6",
                  })}
                </motion.div>

                {active && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute -bottom-1 w-2 h-2"
                    style={{ background: "#ad30de", borderRadius: 9999 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-16 pb-24 md:pb-0">{content}</main>
    </div>
  );
}
