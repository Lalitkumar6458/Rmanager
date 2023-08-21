import React from 'react'
import {BsArrowLeft} from "react-icons/bs"
import {FaBars} from "react-icons/fa"
import { useRouter } from 'next/router';
const SubTopbar = ({data}) => {
    const router = useRouter();
    
  return (
    <div className="px-4 shadow-md h-[50px] w-full fixed top-0 flex items-center justify-between">
      <div className="flex items-center text-[1.4rem] gap-5">
        <BsArrowLeft className="" onClick={() => router.back()} />{" "}
        <span>{data.heading}</span>
      </div>
      <div className="text-[1.3rem]">
        <FaBars />
      </div>
    </div>
  );
}

export default SubTopbar