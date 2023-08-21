import React from "react";
import dayjs from "dayjs";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Addex = ({editData,isEditEx}) => {
  const formRef = React.useRef(null);
  const dateFormat = "DD-MM-YYYY";
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        formRef.current?.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        formRef.current?.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        formRef.current?.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
        break;
    }
  };
  const onFinish = (values) => {
    if (isEditEx) {
        
        console.log("Edit api call",values);
    }else{
        console.log("Save api call", values);

    }
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  // Date object
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    if(isEditEx){
        (editData.date = dayjs("02-05-2023", dateFormat));
          console.log("editData", editData);
       formRef.current?.setFieldsValue(editData);
    }
  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="expense"
        label="Expense"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a Category"
          onChange={onGenderChange} 
          allowClear
        >   
          <Option value="InRoom"> In Room</Option>
          <Option value="InFood">In Food</Option>
          <Option value="InTea">In Tea</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          className="w-full"
          defaultValue={dayjs(currentDate, dateFormat)}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item className="flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button
            className="px-4 py-2 bg-slate-600 text-white flex items-center justify-center"
            htmlType="submit"
          >
            {isEditEx?"Update":"Submit"}
          </Button>
           {isEditEx?
           null
           :<Button
            className="px-4 py-2 border  border-gray-800 text-gray-800 flex items-center justify-center"
            htmlType="button"
            onClick={onReset}
          >
            Reset
          </Button>}
          
        </div>

      </Form.Item>
    </Form>
  );
};
export default Addex;
