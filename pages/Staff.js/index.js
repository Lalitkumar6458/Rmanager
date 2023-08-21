import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

const index = () => {
 
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
            {groupData.map((item) => {
              return (
                <div className="flex flex-col bg-gray-600 text-white px-2 py-2">
                  <div className="flex items-center justify-between">
                    <div className="">
                      <h5>{item.date}</h5>
                      <h4 className='font-semibold'>{item.staffname}</h4>
                    </div>
                    <div className="">{item.category}</div>
                    <div className="font-semibold">{item.expense}</div>
                  </div>
                  <div className="w-full">
                    <p>{item.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default index