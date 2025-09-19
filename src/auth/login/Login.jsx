
import React from "react";
import { Row, Col, Card, Form, Input, Button, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import "./Login.css";

const Login = ({ onViewChange }) => {
  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Login successful!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col>
        <Card
          title={<span className="login-title">Log In</span>}
          className="login-card"
          bodyStyle={{ padding: "24px 48px" }}
        >
          <Form onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                className="login-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                className="login-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="login-button"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Space>
            Don't have an account?
            <Button type="link" onClick={() => onViewChange("signup")}>
              Sign up now!
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
