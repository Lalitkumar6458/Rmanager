import React, { useState } from 'react'
import "../../Styles/ThemeSwitchBtn.css"
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
const ThemeSwitch = () => {
    const [themeChange,setThemeChange]=useState(false)

  return (
    <div>
      <div
        className="h-[27px] w-[50px] bg-[#E2E8F0] flex items-center justify-between p-[3px] rounded-[30px] cursor-pointer"
        onClick={() => setThemeChange(!themeChange)}
      >
        <div
          className={`bg-white text-[1rem] w-[22px] h-[22px] shadow-iconBox flex items-center justify-center rounded-full p-[3px] text-[#969AA1] cursor-pointer  transition-all duration-500 ${
            themeChange ? "opacity-100" : "opacity-0 translate-x-3"
          }`}
        >
          <BiSolidSun className="" />
        </div>
        <div
          className={`bg-white text-[1rem] w-[22px] h-[22px] shadow-iconBox flex items-center justify-center rounded-full p-[3px] text-[#969AA1] cursor-pointer  transition-all duration-500 ${
            themeChange ? "opacity-0 translate-x-[-10px]" : "opacity-100"
          }`}
        >
          <BiSolidMoon className="" />
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch