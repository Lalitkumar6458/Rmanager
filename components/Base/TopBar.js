import {useState} from 'react'
import userImg from "../../public/Images/userImg.png";
import { Dropdown } from "antd";
import Image from 'next/image';
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useRouter } from "next/router";

const TopBar = () => {

    const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
      const LogoutFun = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("Staff");
        // logout()
        router.push("/login");
      };
  const handleMenuClick = (e) => {
    console.log("click", e);
    if(e.key ==3){
      LogoutFun()
    }
  };
  const items = [
    {
      label: "Profile",
      key: "0",
    },
    {
      label:"Help",
      key: "1",
    },
    {
      label: "Logout",
      key: "3",
    },
  ];
  let User;
  let Staff;
 if (typeof localStorage !== 'undefined'){

   User=JSON.parse(localStorage.getItem("User"))
  Staff=JSON.parse(localStorage.getItem("Staff"))

 }
    const onchangehandler=(event)=>{
      console.log(event,"click")
    }
    const menuProps = {
      items,
      onClick: handleMenuClick,
    };
  return (
    <div className="w-full h-[60px] shadow-sm flex items-center justify-between px-[10px]">
      <div className="flex items-center gap-4">
        <MenuFoldOutlined className="text-[1.5rem]" onClick={showDrawer} />
        <h4 className="text-[1.5rem]">Room Manager</h4>
      </div>
      <div className="flex items-center gap-[25px]">
        <div className="flex items-center gap-2">
          <div className="mr-2">
            <h4 className="text-[12px] font-semibold font-inter">
              {User ? User?.name : Staff?.staffname}
            </h4>
            <p className="text-[10px] font-semibold text-[#637381] text-right font-inter">
            {User?"Admin":"Staff"}
            </p>
          </div>
          <Image
            className="w-[36px] h-[36px] rounded-full "
            src={userImg}
            alt="user"
          />
          <div className="cursor-pointer">
            <Dropdown
              menu={menuProps}
              onOpenChange={onchangehandler}
              trigger={["click"]}
            >
              <a href="/" onClick={(e) => e.preventDefault()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.41058 6.91058C4.73602 6.58514 5.26366 6.58514 5.58909 6.91058L9.99984 11.3213L14.4106 6.91058C14.736 6.58514 15.2637 6.58514 15.5891 6.91058C15.9145 7.23602 15.9145 7.76366 15.5891 8.08909L10.5891 13.0891C10.2637 13.4145 9.73602 13.4145 9.41058 13.0891L4.41058 8.08909C4.08514 7.76366 4.08514 7.23602 4.41058 6.91058Z"
                    fill="#637381"
                  />
                </svg>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Drawer
        title="More Manu"
        placement="left"
        onClose={onClose}
        open={open}
      ></Drawer>
    </div>
  );
}

export default TopBar