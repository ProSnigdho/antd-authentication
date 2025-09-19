import React, { useState, useEffect } from "react";
import { ConfigProvider, Spin, theme } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/Firebase";
import Login from "./auth/login/Login";
import SignUp from "./auth/SignUp/SignUp";
import DashBoard from "./components/DashBoard";

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
      <div className="App">
        {currentView === "login" && <Login onViewChange={setCurrentView} />}
        {currentView === "signup" && <SignUp onViewChange={setCurrentView} />}
      </div>
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
      {user ? <DashBoard /> : <AuthPages />}
    </ConfigProvider>
  );
};

export default App;
