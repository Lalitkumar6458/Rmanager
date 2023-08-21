import React, { useState } from "react";
import { Button, Modal } from "antd";
import Layout from "../../components/Layout";
import RGCreateForm from "../../components/RoomGroup/RGCreateForm";
import { DoubleRightOutlined } from "@ant-design/icons";
import AddStaffForm from "../../components/RoomGroup/AddStaffForm";
const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenStaff, setIsModalOpenStaff] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
    const showModalStaff = () => {
      setIsModalOpenStaff(true);
    };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const handleCancelStaff = () => {
      setIsModalOpenStaff(false);
    };
  return (
    <Layout>
      <div className="flex items-center justify-end mt-2 mr-2 rounded">
        <button
          className="px-4 py-2 bg-slate-600 text-white rounded"
          onClick={showModal}
        >
          Create R Group
        </button>
      </div>
      <div className="mt-3 border border-gray-500 px-3">
        <div className="flex items-center justify-between px-3 mt-3">
          <h3 className="text-[1.4rem]">Lalit Room Staff</h3>
          <div className="px-4 py-2 bg-slate-600 text-white rounded">
            <button className="" onClick={showModalStaff}>
              Add Staff
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between px-3 text-gray-300 bg-gray-500 rounded mb-2 h-[60px]">
            <div className="">
              <h3 className="text-[1.5rem]">Lalit kumar</h3>
              <p>lalitkumar@gmail.com</p>
            </div>
            <div className="">
              <DoubleRightOutlined />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Create Room Group"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="">
          <RGCreateForm handleCancel={handleCancel} />
        </div>
      </Modal>
      <Modal
        title="Add Staff"
        open={isModalOpenStaff}
        footer={null}
        onCancel={handleCancelStaff}
      >
        <div className="">
         <AddStaffForm   onCancel={handleCancelStaff}/>
        </div>
      </Modal>
    </Layout>
  );
};

export default index;
