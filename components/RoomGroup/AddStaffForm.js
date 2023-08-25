import React, { useEffect } from "react";
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
const AddStaffForm = ({
  handleCancel,
  getAllData,
  groupId,
  groupData,
  StaffData,
  isEditStaff,
  setIsEditStaff,
}) => {
  const [form] = Form.useForm();
  console.log("groupData app", groupData?.category, StaffData);

  const categoryData = groupData?.category
    ? Object.keys(groupData?.category).map((item) => groupData?.category[item])
    : [];

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    const userId = JSON.parse(localStorage.getItem("User"))._id;

    const ObjectData = {
      groupId: groupId,
      userId: userId,
      staffname: values.staffName,
      staffemail: values.email,
      category: values.category,
    };

    if (isEditStaff) {
      ObjectData["id"] = StaffData._id;
      const response = await fetch("/api/CreateStaff", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ObjectData),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
             form.resetFields();
        console.log("Data Update to database");
        getAllData();
        handleCancel();

        // localStorage.setItem("User", JSON.stringify(data.data))
        // router.push("\login")
      } else {
        console.error("Error saving data to database");
      }
    } else {
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
         form.resetFields();
        console.log("Data saved to database");
        getAllData();
        handleCancel();

        // localStorage.setItem("User", JSON.stringify(data.data))
        // router.push("\login")
      } else {
        console.error("Error saving data to database");
      }
    }
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };

  useEffect(() => {
    if (isEditStaff) {
      console.log(StaffData, "staff data");
      form.setFieldsValue({
        staffName: StaffData.staffname,
        email: StaffData.staffemail,
        category: StaffData.category,
      });
    }
  }, [groupData, StaffData]);
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
      <Form.Item name="category" label="Participate In">
        <Checkbox.Group className="flex items-center gap-4">
          {categoryData.map((each) => {
            return (
              <Checkbox
                value={each}
                style={{
                  lineHeight: "32px",
                }}
                className="whitespace-nowrap"
              >
                {each}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item className="">
        <div className="flex items-center justify-center flex-row gap-3">
          <Button
            className="px-4 py-2 bg-slate-600 text-white flex items-center justify-center"
            htmlType="submit"
          >
            {isEditStaff ? "Update" : "Submit"}
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
