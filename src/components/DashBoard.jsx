import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Spin, Row, Col, Card } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";
import "./Dashboard.css";

const { Header, Sider, Content } = Layout;

const DashboardContent = () => (
  <div className="welcome-container">
    <DashboardOutlined className="welcome-icon" />
    <h1 className="welcome-heading">Welcome to your Dashboard!</h1>
    <p className="welcome-text">
      You have successfully logged in. This is your custom dashboard.
    </p>
  </div>
);

const ProfilePage = ({ user }) => (
  <Row justify="center" align="middle" style={{ height: "100%" }}>
    <Col span={18}>
      <Card title="User Profile" bordered={false}>
        <p>
          <strong>First Name:</strong> {user?.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </Card>
    </Col>
  </Row>
);

const SettingsPage = () => (
  <div style={{ padding: "24px" }}>
    <h1 style={{ textAlign: "center" }}>Settings</h1>
    <p style={{ textAlign: "center" }}>Customize your settings here.</p>
  </div>
);

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("1");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUser({ ...authUser, ...userDocSnap.data() });
        } else {
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "1":
        return <DashboardContent />;
      case "2":
        return <ProfilePage user={user} />;
      case "3":
        return <SettingsPage />;
      default:
        return <DashboardContent />;
    }
  };

  if (loading) {
    return (
      <Layout
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          className="menu-toggle-button"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <div className="header-right">
          <h1 className="dashboard-title">
            Welcome, {user?.firstName ? user.firstName : "User"}!
          </h1>
          <Button
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            className="dashboard-logout-button"
          >
            Logout
          </Button>
        </div>
      </Header>

      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="dashboard-sider"
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPage]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>

        <Content className="dashboard-content">{renderPage()}</Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
