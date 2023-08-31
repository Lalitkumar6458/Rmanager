import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Spin } from "antd";
import Layout from "../../components/Layout";
import RGCreateForm from "../../components/RoomGroup/RGCreateForm";
import { ApiEndPoint } from "../../public/ApiEndPoint";
import {
  DoubleRightOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AddStaffForm from "../../components/RoomGroup/AddStaffForm";
import { FormOutlined  } from "@ant-design/icons";
const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenStaff, setIsModalOpenStaff] = useState(false);
  const[groupid,setGroupId]=useState("")
  const [groupData, setGroupData] = useState({});
const[isEditGroup,setIsEditGroup]=useState(false)
const[RGroupData,setRGroupData]=useState([])
const [isEditStaff, setIsEditStaff] = useState(false);
const [StaffData, setStaffData] = useState([]);
const [isLoading,setIsLoading]=useState(false)
  const showModal = () => {
    setIsModalOpen(true);
    setIsEditGroup(false)
  };
    const showModalStaff = (groupId,groupData) => {
      setIsModalOpenStaff(true);
      setGroupId(groupId);
      setGroupData(groupData);
      setIsEditStaff(false)
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
        async function getPostdata() {
          setIsLoading(true)
          const userId = JSON.parse(localStorage.getItem("User"))._id;

          const response = await fetch(`${ApiEndPoint}Group?userId=` + userId);
          const data = await response.json();
          console.log(data,"data rogrop");
          setIsLoading(false);

          setRGroupData(data.allData);
          console.log("data", data);

        }

          async function getStaffdata(userId,groupId) {
            // const userId = JSON.parse(localStorage.getItem("User"))._id;

            const response = await fetch(
              `${ApiEndPoint}Group?userId=${userId}&groupId=${groupId}`
            );
            const data = await response.json();
            // console.log(data);
            // setRGroupData(data.data);
            console.log("data staff", data);
          }

    useEffect(()=>{
getPostdata()
// getStaffdata("64cc9f51f909a6cade9ebf8a", "64e2e6d93184735129f858ae");
    },[])
    const EditGroup=(data)=>{
    setIsModalOpen(true);
    setIsEditGroup(true)
console.log(data,"edit")
      setGroupData(data);

    }
    const EditStaff=(data,groupData)=>{
setIsModalOpenStaff(true)
setStaffData(data);
setGroupData(groupData);
setIsEditStaff(true);
    }
    const DeleteGroup = async (id) => {
      console.log("id", id);
      const userId = JSON.parse(localStorage.getItem("User"))._id;

      const response = await fetch(`${ApiEndPoint}Group`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
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
    };

    const DeleteStaff=async (id)=>{
      console.log("id",id)
       const userId = JSON.parse(localStorage.getItem("User"))._id;

       const response = await fetch(`${ApiEndPoint}Staff`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ id, userId }),
       });
       const data = await response.json();
       if (response.ok) {
         console.log("Data saved to database");
         getPostdata();
         setIsModalOpenStaff(false)
         // localStorage.setItem("User", JSON.stringify(data.data))
         // router.push("\login")
       } else {
         console.error("Error saving data to database");
       }
    }
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

      {isLoading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <div className="mt-3 border border-gray-500 px-3 rounded-lg py-1">
          {RGroupData.map((item) => {
            return (
              <div
                className="shadow-md py-1 mb-2 border px-1 rounded-lg"
                key={item["group"]._id}
              >
                <div className="flex items-center justify-between px-3 mt-3">
                  <h3 className="text-[1.4rem] flex items-center gap-2">
                    {item["group"].groupname}{" "}
                    <FormOutlined
                      onClick={() => EditGroup(item["group"])}
                      className="ml-2 cursor-pointer"
                    />
                    <Popconfirm
                      title="Delete the Group"
                      onConfirm={() => DeleteGroup(item["group"]._id)}
                      description={
                        "Are you sure to delete this " +
                        item["group"].groupname +
                        " ?"
                      }
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <DeleteOutlined className="ml-2 cursor-pointer text-red-700" />
                    </Popconfirm>
                  </h3>{" "}
                  <div className="px-4 py-2 bg-slate-600 text-white rounded">
                    <button
                      className=""
                      onClick={() =>
                        showModalStaff(item["group"]._id, item["group"])
                      }
                    >
                      Add Staff
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  {/* {getStaffdata(item.userId,item._id)} */}

                  {item["staff"].map((each) => {
                    return (
                      <div
                        key={each._id}
                        onClick={() => EditStaff(each, item["group"])}
                        className="flex items-center justify-between px-3 text-gray-300 bg-gray-500 rounded mb-2 h-[60px]"
                      >
                        <div className="">
                          <h3 className="text-[1.5rem]">{each.staffname}</h3>
                          <p>{each.staffemail}</p>
                        </div>
                        <div className="">
                          <DoubleRightOutlined />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        title="Create Room Group"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="">
          <RGCreateForm
            handleCancel={handleCancel}
            getAllData={getPostdata}
            groupData={groupData}
            isEditGroup={isEditGroup}
          />
        </div>
      </Modal>
      <Modal
        title={
          <div className="flex items-center justify-between pr-[40px]">
            <h3>{isEditStaff ? "Edit Staff" : "Add Staff"}</h3>

            {isEditStaff ? (
              <Popconfirm
                title="Delete the Staff"
                onConfirm={() => DeleteStaff(StaffData._id)}
                description={"Are you sure to delete this Staff ?"}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <button className="bg-red-700 text-white font-semibold rounded py-[5px] px-3 flex items-center justify-center gap-1 ">
                  Delete <DeleteOutlined />
                </button>
              </Popconfirm>
            ) : null}
          </div>
        }
        open={isModalOpenStaff}
        footer={null}
        onCancel={handleCancelStaff}
      >
        <div className="">
          <AddStaffForm
            handleCancel={handleCancelStaff}
            getAllData={getPostdata}
            groupId={groupid}
            groupData={groupData}
            StaffData={StaffData}
            isEditStaff={isEditStaff}
            setIsEditStaff={setIsEditStaff}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default index;
