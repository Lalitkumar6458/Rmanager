import SubTopbar from '../../components/Base/SubTopbar'
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Addex from '../../components/StaffCon/Addex';
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete} from "react-icons/ai"
const index = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isEditEx, setIsEditEx] = useState(false);

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
      const EditExpenses=(data)=>{
        setEditData(data)
        setIsEditEx(true)
showModal()

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
            {dumyData.map((item) => {
              return (
                <div
                  className="flex items-center justify-between bg-slate-600 text-white px-4 py-2"
                  key={item.id}
                >
                  <div className="w-[65%] flex-[65%]">
                    <h5 className="font-semibold mb-1">{item.date}</h5>
                    <p className="border rounded w-fit px-[4px]">
                      {item.category}
                    </p>
                    <h4 className="text-[1rem]">{item.note}</h4>
                  </div>
                  <div className="text-[1.3rem] font-semibold flex-[20%] w-[20%]">
                    {item.expense}
                  </div>
                  <div className="flex-[15%] w-[15%] flex items-center  gap-4 flex-col">
                    <FaEdit
                      className="text-[1.5rem] text-yellow-600"
                      onClick={() => EditExpenses(item)}
                    />
                    <AiFillDelete className="text-[1.5rem] text-red-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Addex editData={EditData} isEditEx={isEditEx} />
      </Modal>
    </div>
  );
}

export default index