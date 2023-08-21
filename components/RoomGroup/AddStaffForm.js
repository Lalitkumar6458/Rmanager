import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select,Checkbox,
  Col,Row } from "antd";
const { Option } = Select;
const areas = [
  {
    label: "Beijing",
    value: "Beijing",
  },
  {
    label: "Shanghai",
    value: "Shanghai",
  },
];
const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};
const AddStaffForm = ({ handleCancel }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    const ObjectData = {};
    const response = await fetch("/api/CreateStaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ObjectData),
    });
    const data = await response.json();
    console.log("data", data);
    if (response.ok) {
      console.log("Data saved to database");

      // localStorage.setItem("User", JSON.stringify(data.data))
      // router.push("\login")
    } else {
      console.error("Error saving data to database");
    }
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <Form
      form={form}
      name="dynamic_form_complex"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.Item
        name="staffName"
        label="Staff Name"
        rules={[
          {
            required: true,
            message: "Missing Staff Name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Staff Email"
        rules={[
          {
            required: true,
            message: "Missing Staff Email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="checkbox-group" label="Participate In">
        <Checkbox.Group className="flex items-center gap-4">
              <Checkbox
                value="InFood"
                style={{
                  lineHeight: "32px",
                }}
                className="whitespace-nowrap"
              >
                In Food
              </Checkbox>
        
              <Checkbox
                value="InTea"
                style={{
                  lineHeight: "32px",
                }}
                className="whitespace-nowrap"
              >
                In Tea
              </Checkbox>
          
        
              <Checkbox
                value="InRoom"
                style={{
                  lineHeight: "32px",
                }}
                className="whitespace-nowrap"
              >
                In Room
              </Checkbox>
   
        </Checkbox.Group>
      </Form.Item>
      <Form.Item className="">
        <div className="flex items-center justify-center flex-row gap-3">
          <Button
            className="px-4 py-2 bg-slate-600 text-white flex items-center justify-center"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="px-4 py-2 border  border-gray-800 text-gray-800 flex items-center justify-center"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
export default AddStaffForm;
