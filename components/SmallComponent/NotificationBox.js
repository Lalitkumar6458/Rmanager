import React from 'react'
import { RiNotification2Line } from "react-icons/ri";

const NotificationBox = () => {
  return (
    <div className="">
      <div className="h-[27px] w-[27px] bg-[#EFF4FB] rounded-full border border-[#E2E8F0] flex items-center justify-center relative">
        <RiNotification2Line className="12px text-[#64748B]" />
        <div className="top-[-4px] absolute right-[-1px] bg-[#DC3545] w-[10px] h-[10px] rounded-full border-[2px] border-white"></div>
      </div>
    </div>
  );
}

export default NotificationBox