import Header from "./Header";
import Footer from "./Footer";
import { Html } from "next/document";
import Head from "next/head";
import TopBar from "./Base/TopBar";

import { useEffect } from "react";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
const router = useRouter()
useEffect(()=>{

let AuthCheck;
if (typeof localStorage !== "undefined") {
  const userAuth = JSON.parse(localStorage.getItem("User"));
  const staffAuth = JSON.parse(localStorage.getItem("Staff"));
  //  setUser( JSON.parse(localStorage.getItem("User")))
  AuthCheck = userAuth ? userAuth : staffAuth;
  console.log("staffAuth", staffAuth);
}
console.log("AuthCheck", AuthCheck);
if(!AuthCheck){
router.push("/login")
}
},[])

  return (
    <>
      <Head>
        <title>Room Manager</title>
        <meta
          name="description"
          content="Room Managment System All expenses manager"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

        <div className="content">
          {/* <Header /> */}
          <TopBar />
          <div className="h-[calc(100vh-60px)] ">{children}</div>
          <Footer />
        </div>
 
    </>
  );
};

export default Layout;
