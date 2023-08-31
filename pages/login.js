import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from "antd";
import { ApiEndPoint } from '../public/ApiEndPoint';
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
    const[LoginType,setLoginType]=useState(false)
    const router = useRouter()

const onFinishStaff = async (values) => {
 messageApi.open({
   key,
   type: "loading",
   content: "Loading...",
 });
  event.preventDefault();
    try {
       const response = await fetch(`${ApiEndPoint}StaffLogin`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
       });
       const data = await response.json();

       if (response.ok) {
           messageApi.open({
             key,
             type: "success",
             content: "Login Succesfully!",
           });
         console.log("Login Succes to database");
         localStorage.setItem("Staff", JSON.stringify(data.User));
         router.push("/staffpage");
         localStorage.removeItem("User");
       } else {
           messageApi.open({
             key,
             type: "error",
             content: data.error,
           });
         alert(data.error);
         console.log("Error saving data to database");
       }
    }
    catch(error){
console.log(error);
alert("error"+error)
    }
 
};
const onFinishAdmin = async (values) => {
  console.log("Success:", values);
   messageApi.open({
     key,
     type: "loading",
     content: "Loading...",
   });
  try {
     const response = await fetch(`${ApiEndPoint}login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: values.username,
         password: values.password,
       }),
     });
     const data = await response.json();
     console.log("data", data);
     if (response.ok) {
      messageApi.open({
        key,
        type: "success",
        content: "Login Succesfully!",
      });
       console.log("Data saved to database");
       localStorage.setItem("User", JSON.stringify(data.data));
       localStorage.removeItem("Staff");

       router.push("/Roomgroup");
     } else {
        messageApi.open({
          key,
          type: "error",
          content: data.error,
        });
       alert(data.error);
       console.log("Error saving data to database");
     }

  } catch (error) {
console.log("error",error)
alert("eeror " + error);
  }
 
};
const onFinishFailedAdmin = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
    return (
      <div className="w-full flex items-center justify-center bg-blue-950 h-screen px-4">
        {contextHolder}
        <div className="bg-white rounded-lg flex items-center justify-center flex-col w-[95%] md:w-[40%]">
          <h2 className="text-[1.4rem] mt-3">Login</h2>
          <div className="w-full h-[50px] flex items-center justify-center ">
            <div className="w-[200px] shadow h-[50px] p-1 rounded-md">
              <button
                className={` h-full w-1/2 rounded-md ${
                  LoginType
                    ? "bg-white text-gray-900"
                    : "bg-gray-500 text-white"
                }`}
                onClick={() => setLoginType(false)}
              >
                Admin
              </button>
              <button
                className={`h-full w-1/2 rounded-md ${
                  LoginType
                    ? "bg-gray-500 text-white"
                    : " bg-white text-gray-900"
                }`}
                onClick={() => setLoginType(true)}
              >
                Staff
              </button>
            </div>
          </div>

          <div className="px-3 w-full">
            {LoginType ? (
              <div>
                <Form
                  name="StaffLogin"
                  onFinish={onFinishStaff}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Staff Email"
                    name="StaffEmail"
                    rules={[
                      {
                        required: true,
                        message: "Missing Staff Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Room Group Name"
                    name="RgName"
                    rules={[
                      {
                        required: true,
                        message: "Missing Room Group Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Room Group Password"
                    name="Rgpassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input Room Group Password!",
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
              </div>
            ) : (
              <div className="w-full">
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
                  No Account?{" "}
                  <Link href="/Signup" className="text-blue-400">
                    Signup
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Login