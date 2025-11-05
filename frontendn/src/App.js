import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./context/useAuth";

import Login from "./routes/login";
import Menu from "./routes/menu";
import Register from "./routes/register";

import Layout from "./components/layout";
import PrivateRoute from "./components/private_route";
import RecordSong from "./components/pages/RecordSong";
import NavBar from "./components/NavBar";



function App() {
  const drawerWidth = 240;

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route path="/register" element={<Register />} />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={["admin", "patient"]}>
                <NavBar drawerWidth={drawerWidth} content={<RecordSong />} />
              </PrivateRoute>
            }
          />











        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
