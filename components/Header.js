/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
const userAuth=localStorage.getItem("User")
  const LogoutFun=()=>{
    localStorage.removeItem("User")
router.push("/login")
  }
  return (
   <div className="h-[60px] shadow-md w-full ">
<div className="">
  <h2>Logo</h2>
  <div className="">
    
  </div>
</div>
   </div>
  );
};

export default Header;
