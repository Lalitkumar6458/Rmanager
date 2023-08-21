import { useRouter } from 'next/router'

import { useState } from 'react';
import Link from 'next/link';
import { Button, Checkbox, Form, Input } from "antd";
const Signup = () => {
    const router = useRouter()
const onFinishAdmin = async (values) => {
  console.log("Success:", values);
  const response = await fetch("/api/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: values.username,
      email: values.email,
      password: values.password,
    }),
  });
  const data = await response.json();
  console.log("data", data);
  if (response.ok) {
    console.log("Data saved to database");
    localStorage.setItem("User", JSON.stringify(data.data));
    router.push("login");
  } else {
    console.error("Error saving data to database");
  }
};
  
const onFinishFailedAdmin = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

  return (
    <div className="w-full flex items-center justify-center bg-blue-950 h-screen px-1">
      <div className="bg-white rounded-lg flex items-center justify-center flex-col w-[90%]">
        <h2 className="text-[1.4rem] mt-3">SignUp</h2>
        <div className="">
          <Form
            name="AdminLogin"
            onFinish={onFinishAdmin}
            onFinishFailed={onFinishFailedAdmin}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type='email' />
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

            <Form.Item className="flex items-center justify-center">
              <Button
                className="py-2 px-3 bg-slate-600 text-white rounded flex items-center justify-center"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <p className="text-[1.3rem] mb-3 text-center">
            If Have Already Account?{" "}
            <Link href="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup