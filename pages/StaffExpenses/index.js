import SubTopbar from '../../components/Base/SubTopbar'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Popconfirm } from "antd";
import Addex from '../../components/StaffCon/Addex';
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete} from "react-icons/ai"
const index = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditEx, setIsEditEx] = useState(false);
     const[expensesData,setExpensesData]=useState([])
     let Staff;
     if (typeof localStorage !== "undefined") {
    Staff = JSON.parse(localStorage.getItem("Staff"));
     }
     const showModal = () => {
       setIsModalOpen(true);
     };
     const OpenAddEx=()=>{
        setIsEditEx(false);
showModal()
     }
     const handleOk = () => {
       setIsModalOpen(false);
     };
     const handleCancel = () => {
       setIsModalOpen(false);
     };
     const[EditData,setEditData]=useState({})
      const dumyData = [
        {
          id: 1,
          expense: 234,
          note: "dumy expesset testing",
          category: "In Room",
          date: "30 jul 2023",
        },
        {
          id: 2,
          expense: 324,
          note: "somthing get gfkcvn lorem",
          category: "In Food",
          date: "01 Aug 2023",
        },
      ];
      const dateFormate = (inputDate) => {
      
        // Step 1: Parse the input date string
        const dateObject = new Date(inputDate);

        // Step 2: Format the date object into the desired output format
   

     // Step 2: Format the date components
     const day = dateObject.getUTCDate();
     const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
       dateObject
     );
     const year = dateObject.getUTCFullYear();

     // Step 3: Combine the formatted components
     const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
      };
      
      const EditExpenses=(data)=>{
        setEditData(data)
        setIsEditEx(true)
showModal()

      }
       async function getPostdata() {
        //  setIsLoading(true);

         const response = await fetch(
           `api/ExpensesStaff?userId=${Staff.userId}&groupId=${Staff.groupId}&staffId=${Staff._id}`
         );
         const data = await response.json();
         console.log(data);
         // setIsLoading(false);
setExpensesData(data.data);
         // setRGroupData(data.allData);
         console.log("data", data.data, data.totalExpenseAmount);
         localStorage.setItem("YourEx", data.totalExpenseGroupAmount);
       }
       useEffect(() => {
         getPostdata();
       }, []);

       const deleteExpenses=async(id)=>{
 const response = await fetch("/api/ExpensesStaff", {
   method: "DELETE",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({ id, userId:Staff.userId }),
 });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        console.log("Data saved to database");
        getPostdata();
        // localStorage.setItem("User", JSON.stringify(data.data))
        // router.push("\login")
      } else {
        console.error("Error saving data to database");
      }
       }
  return (
    <div>
      <SubTopbar data={{ heading: "Your Expenses" }} />
      <div className="mt-[50px]">
        <div className="flex items-center justify-end">
          <button
            onClick={OpenAddEx}
            className="py-2 px-3 bg-gray-600 text-white flex items-center justify-center rounded mt-3 mr-2"
          >
            Add Ex
          </button>
        </div>

        <div class="mt-4">
          <div className="text-[1.3rem] font-semibold pl-4 w-full bg-slate-600 text-white border-b-2 rounded-[5px 5px 0px 0px] border-white">
            Recent Transections
          </div>
          <div className="flex flex-col gap-[2px]">
            {expensesData.map((item) => {
              return (
                <div
                  className="flex items-center justify-between bg-slate-600 text-white px-4 py-2"
                  key={item._id}
                >
                  <div className="w-[65%] flex-[65%]">
                    <h5 className="font-semibold mb-1">
                      {dateFormate(item.date)}
                    </h5>
                    <p className="border rounded w-fit px-[4px]">
                      {item.category}
                    </p>
                    <h4 className="text-[1rem]">{item.node}</h4>
                  </div>
                  <div className="text-[1.3rem] font-semibold flex-[20%] w-[20%]">
                    {item.Expense}
                  </div>
                  <div className="flex-[15%] w-[15%] flex items-center  gap-4 flex-col">
                    <FaEdit
                      className="text-[1.5rem] text-yellow-600"
                      onClick={() => EditExpenses(item)}
                    />
                    <Popconfirm
                      title="Delete the Expenses"
                      description="Are you sure to delete this Expenses?"
                      onConfirm={()=>deleteExpenses(item._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <AiFillDelete className="text-[1.5rem] text-red-700" />
                    </Popconfirm>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title={isEditEx?"Edit Expenses":"Add Expenses"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Addex
          editData={EditData}
          getAddedData={getPostdata}
          isEditEx={isEditEx}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default index