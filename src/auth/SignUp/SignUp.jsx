
import React from "react";
import { Row, Col, Card, Form, Input, Button, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import "./Signup.css";

const Signup = ({ onViewChange }) => {
  const onFinish = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
      });

      message.success("Account created successfully! Please log in.");
      onViewChange("login");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row justify="center" align="middle" className="signup-container">
      <Col>
        <Card
          title={<span className="signup-title">Sign Up</span>}
          className="signup-card"
          bodyStyle={{ padding: "24px 48px" }}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                placeholder="First Name"
                size="large"
                className="signup-input"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                placeholder="Last Name"
                size="large"
                className="signup-input"
              />
            </Form.Item>
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
                className="signup-input"
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
                className="signup-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="signup-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <Space>
            Already have an account?
            <Button type="link" onClick={() => onViewChange("login")}>
              Log in
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
