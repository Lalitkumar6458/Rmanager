import React, { useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
const { Option } = Select;
import { ApiEndPoint } from "../../public/ApiEndPoint";
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
const ISSERVER = typeof window === "undefined";
let User;
if(!ISSERVER) {
    // Access localStorage
     User=JSON.parse(localStorage.getItem("User"))
}
const RGCreateForm = ({ handleCancel, getAllData, groupData, isEditGroup }) => {
  console.log("groupData", groupData, getAllData);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    let category = {};
    values.category.map((item) => {
      category = {
        ...category,
        ...item,
      };
    });
    console.log("data cat", category);
    const ObjectData = {
      groupname: values.rgGroup,
      password: values.password,
      userId: User._id,
      category: category,
    };
    if(isEditGroup){
      ObjectData["id"] = groupData._id
    console.log("Received values of form: edt form", values);

    const response = await fetch(`${ApiEndPoint}Group`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ObjectData),
    });
    const data = await response.json();
    console.log("data", data);
    if (response.ok) {
      console.log("Data saved to database");
       form.resetFields();
      getAllData();
      handleCancel();
      // localStorage.setItem("User", JSON.stringify(data.data))
      // router.push("\login")
    } else {
      console.error("Error saving data to database");
    }

    }else{
   const response = await fetch(`${ApiEndPoint}Group`, {
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
      form.resetFields();
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
    if (isEditGroup) {
      const getCategoryData = Object.keys(groupData.category).map((item) => ({
        [item]: groupData.category[item],
      }));
      console.log(getCategoryData, "getCategoryData");
      form.setFieldsValue({
        rgGroup: groupData.groupname,
        password: groupData.password,
        category: getCategoryData,
      });
    }else{
      form.setFieldsValue({
        rgGroup: "",
        password: "",
        category: [],
      });
    }
  }, [groupData, isEditGroup]);

 
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
          name="rgGroup"
          label="Room Group Name"
          rules={[
            {
              required: true,
              message: "Missing Room Group Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Group Password"
          rules={[
            {
              required: true,
              message: "Missing Group Password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.List name="category">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    label="Category"
                    name={[field.name, `category_${index + 1}`]}
                    rules={[
                      {
                        required: true,
                        message: "Missing participate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className=""
                >
                  Add Category
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className="">
          <div className="flex items-center justify-center flex-row gap-3 mt-2">
            <Button
              className="px-4 py-2 bg-slate-600 text-white flex items-center justify-center"
              htmlType="submit"
            >
              {isEditGroup ? "Update" : "Submit"}
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
export default RGCreateForm;
