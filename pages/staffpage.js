import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const staffpage = () => {
    const [ExpensesStaffData, setExpensesStaffData] = useState([]);
    const Staff = JSON.parse(localStorage.getItem("Staff"));
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
    const groupData = [
      {
        id: 1,
        staffname: "Staff1 kumar",
        expense: 234,
        note: "dumy expesset testing",
        category: "In Room",
        date: "30 jul 2023",
      },
      {
        id: 2,
        staffname: "Staff2 kumar",
        expense: 674,
        note: "dumy expesset testing",
        category: "In Room",
        date: "29 jul 2023",
      },
      {
        id: 3,
        staffname: "Staff3 kumar",
        expense: 467,
        note: "dumy tryujnv testing",
        category: "In Room",
        date: "31 jul 2023",
      },
    ];

    async function getPostdata() {
      // setIsLoading(true);

      const response = await fetch(
        `api/ExpensesStaff?userId=${Staff.userId}&groupId=${Staff.groupId}&staffId=null`
      );
      const data = await response.json();
      console.log(data);
      // setIsLoading(false);
      // setExpensesData(data.data);
      setExpensesStaffData(data.data);
      console.log("data", data.data);
    }
    useEffect(() => {
      getPostdata();
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
                      <h4 className="font-semibold">{item.staffname}</h4>
                    </div>
                    <div className="">{item.category}</div>
                    <div className="font-semibold">{item.Expense}</div>
                  </div>
                  <div className="w-full">
                    <p>{item.node}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default staffpage;
