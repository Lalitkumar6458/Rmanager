import React, { useEffect } from "react";
import dayjs from "dayjs";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
} from "antd";
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

const Addex = ({ editData, isEditEx, getAddedData, handleCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
 const key = "updatable";
  const formRef = React.useRef(null);
  const dateFormat = "DD-MM-YYYY";
  const Staff = JSON.parse(localStorage.getItem("Staff"));
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
  console.log(editData, "editData");
  const onFinish = async (values) => {
     messageApi.open({
       key,
       type: "loading",
       content: "Loading...",
     });
    console.log("data", values.date.$D, values.date.$M, values.date.$y);
let day=""
    if(values.date.$D<10){
day = "0" + values.date.$D;
    }else{
day = values.date.$D;
    }
    let month=""
    if (values.date.$M < 10) {
      month = `0${values.date.$M + 1}`
    } else {
      month = values.date.$M + 1;
    }
    const newDate = `${values.date.$y}-${month}-${day}`;
    console.log("newDate", newDate);
    const ObjectData = {
      groupId: Staff.groupId,
      userId: Staff.userId,
      staffId: Staff._id,
      staffname: Staff.staffname,
      Expense: values.expense,
      date: new Date(newDate), // Assign the date
      node: values.note,
      category: values.category,
    };
    console.log("ObjectData", ObjectData);
    if (isEditEx) {
      console.log("Edit api call", values);
      ObjectData['id']=editData._id
 const response = await fetch("/api/ExpensesStaff", {
   method: "PUT",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(ObjectData),
 });
 const data = await response.json();
 console.log("data", data);
 if (response.ok) {
    messageApi.open({
      key,
      type: "success",
      content: "Expense Update Succesfully!",
    });
  formRef.current?.resetFields();
   console.log("Data Update to database");
    getAddedData();
   handleCancel();
   // localStorage.setItem("User", JSON.stringify(data.data))
   // router.push("\login")
 } else {
   messageApi.open({
     key,
     type: "error",
     content: "Error saving data to database",
   });
   console.error("Error saving data to database");
 }

    } else {
      console.log("Save api call", values);

      const response = await fetch("/api/ExpensesStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ObjectData),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
          messageApi.open({
            key,
            type: "success",
            content: "Expense Added Succesfully!",
          });
        formRef.current?.resetFields();
        console.log("Data saved to database");
        getAddedData();
        handleCancel();
        // localStorage.setItem("User", JSON.stringify(data.data))
        // router.push("\login")
      } else {
           messageApi.open({
             key,
             type: "error",
             content: "Error Updating data to database",
           });
        console.error("Error saving data to database");
      }
    }
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  // Date object
 const formateDate=(datenew)=>{
  let date
  if (datenew) {
const dateFormat = "DD-MM-YYYY";

const inputDate = new Date(datenew);
const day = inputDate.getUTCDate().toString().padStart(2, "0");
const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");
const year = inputDate.getUTCFullYear();

const formattedDate = dateFormat
  .replace("DD", day)
  .replace("MM", month)
  .replace("YYYY", year);
  console.log(formattedDate);
return formattedDate;

  } else {
    date = new Date();
    console.log(date,"else");
    let currentDay = String(date.getDate()).padStart(2, "0");
   
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
   
    let currentYear = date.getFullYear();
   
    // we will display the date as DD-MM-YYYY
   
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    return currentDate;
  }

 }
useEffect(() => {
  if (isEditEx) {
    formRef.current?.setFieldsValue({
      expense: editData.Expense,
      category: editData.category,
      date: dayjs(formateDate(editData.date), dateFormat),
      note: editData.node,
    });
  }else{
    formRef.current?.setFieldsValue({
      expense: '',
      category: '',
      date: dayjs(formateDate(), dateFormat),
      note: '',
    });
  }
}, [editData, isEditEx]);

  return (
    <>
      {contextHolder}

      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          date: dayjs(formateDate(), dateFormat),
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
            {Staff.category.map((item) => {
              return (
                <Option value={item} key={item}>
                  {" "}
                  {item}
                </Option>
              );
            })}
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
          <DatePicker className="w-full" format={dateFormat} />
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

        <Form.Item className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center gap-4 w-full">
            <Button
              className="px-4 py-2 bg-slate-600 text-white flex items-center justify-center"
              htmlType="submit"
            >
              {isEditEx ? "Update" : "Submit"}
            </Button>
            {isEditEx ? null : (
              <Button
                className="px-4 py-2 border  border-gray-800 text-gray-800 flex items-center justify-center"
                htmlType="button"
                onClick={onReset}
              >
                Reset
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
export default Addex;
