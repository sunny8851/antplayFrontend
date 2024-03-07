import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../api/auth";
import Loader from "../Loader";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check if the user is logged in by inspecting localStorage

    // if (window.location.href !== "http://localhost:3000/") {
    const isLoggedIn = localStorage.getItem("userData");
    if (isLoggedIn) {
      // If the user is logged in, redirect to the home page
      window.location.href = "/";
    } else setIsLoading(false);
    // }
  }, []);
  console.log(isLoading);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const onLoginSuccess = (e) => {
    console.log(e);
    localStorage.setItem("userData", JSON.stringify(e.data));
    openNotification("Successfully Loged in");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const onLoginFailure = (e) => {
    const msg = e.response.data.error;
    openNotification(msg);
    setIsLoading(false);
  };
  const onFinish = (values) => {
    setIsLoading(true);
    console.log("Success:", values);
    const data = {
      password: values.password,
      email: values.email,
    };
    LoginApi(onLoginSuccess, onLoginFailure, data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const openNotification = (msg) => {
    console.log("object", msg);
    api.info({
      message: msg,
    });
  };
  return !isLoading ? (
    <div className="max-w-[500px] mt-64 w-full mx-auto">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 450,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="mb-4 ml-10 flex justify-center">
          <button
            className="bg-blue-500 rounded px-3 py-1"
            type="primary"
            htmlType="submit"
          >
            Login
          </button>
        </div>
      </Form>
      <p className="text-center">
        Don't have a account!{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-400 cursor-pointer"
        >
          Create
        </span>
      </p>
    </div>
  ) : (
    <div>
      {contextHolder}
      <Loader />
    </div>
  );
};
export default Login;
