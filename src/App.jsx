import React, { useState, useEffect } from "react";
import { ConfigProvider, Spin, theme } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/Firebase";
import Login from "./auth/login/Login";
import SignUp from "./auth/SignUp/SignUp";
import DashBoard from "./components/DashBoard";
import "./App.css"; // Make sure to import your CSS file

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const AuthPages = () => {
    const [currentView, setCurrentView] = useState("login");
    return (
      <>
        {/* Render the background layer first, it will be positioned behind everything else */}
        <div className="background-layer"></div>

        {/* Render your content on top of the background */}
        {currentView === "login" && <Login onViewChange={setCurrentView} />}
        {currentView === "signup" && <SignUp onViewChange={setCurrentView} />}
      </>
    );
  };

  if (loading) {
    return (
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#141414",
          }}
        >
          <Spin size="large" />
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {user ? (
        <DashBoard />
      ) : (
        <div className="app-container">
          {/* This new container will center your AuthPages content */}
          <AuthPages />
        </div>
      )}
    </ConfigProvider>
  );
};

export default App;
