import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const staffpage = () => {
    const [ExpensesStaffData, setExpensesStaffData] = useState([]);
    const [GTotalAmount,setTotalAmount]=useState(0)
    const [YourEx,setYourEx]=useState(0)
   let Staff;
   let YourExAmount=0
   if (typeof localStorage !== "undefined") {
     Staff = JSON.parse(localStorage.getItem("Staff"));
   }
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

    async function getPostdata() {
      // setIsLoading(true);

      const response = await fetch(
        `api/ExpensesStaff?userId=${Staff.userId}&groupId=${Staff.groupId}&staffId=null`
      );
      const data = await response.json();
      console.log(data);
      // setIsLoading(false);
      // setExpensesData(data.data);
      setTotalAmount(data.totalExpenseGroupAmount);
      setExpensesStaffData(data.data);
      console.log("data", data.data);
    }
    useEffect(() => {
      console.log(YourExAmount, "YourExAmount");
      getPostdata();
       if (typeof localStorage !== "undefined") {

       }
setYourEx(localStorage.getItem("YourEx")?localStorage.getItem("YourEx"):0);
    }, []);
  return (
    <Layout>
      <div className="">
        <div className=""></div>
        <div className="flex items-center justify-end">
          <button className="bg-gray-600 text-white text-[1.4rem] py-2 px-3 rounded mr-3 mt-4">
            <Link href="/StaffExpenses">Your Ex</Link>
          </button>
        </div>

        <div className=" mt-3 ">
          <div class="text-[1.3rem] border-b-2 bg-gray-600 text-white px-2">
            Group Transections
          </div>
          <div className="flex flex-col gap-1">
            {ExpensesStaffData.map((item) => {
              return (
                <div
                  className="flex flex-col bg-gray-600 text-white px-2 py-2"
                  key={item._id}
                >
                  <div className="flex items-center justify-between">
                    <div className="">
                      <h5>{dateFormate(item.date)}</h5>
                      <h4 className="font-semibold">{item.category}</h4>
                    </div>
                    <div className=""> {item.staffname}</div>
                    <div className="font-semibold">{item.Expense}</div>
                  </div>
                  <div className="w-full">
                    <p>{item.node}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fixed bottom-0 bg-white shadow-xl grid grid-cols-2 w-full border">
            <div className=" border-b text-[1.2rem] pl-3 border-r py-2">
              G Total Ex:
              <span className="text-[1.5rem] font-semibold ml-2">
                {GTotalAmount?GTotalAmount:0}
              </span>
            </div>
            <div className="  border-b text-[1.2rem] pl-3 py-2 ">
              Your Total Ex:
              <span className="text-[1.5rem] font-semibold ml-2">{YourEx}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default staffpage;
