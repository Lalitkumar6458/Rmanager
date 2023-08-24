import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Carousel2 from '../components/Carousel'
import { useState,useEffect } from 'react'
import Layout from '../components/Layout'
import { useRouter } from "next/router";

import Link from 'next/link'

export default function Home() {
  const router = useRouter();
     if (typeof localStorage !== "undefined") {
      
      let staffAuth = JSON.parse(localStorage.getItem("Staff"));
      if(staffAuth){
        router.push("/Staff")
      }
       //  setUser( JSON.parse(localStorage.getItem("User")))
     }

  return (
    <>
      <Layout>
        <div className="relative h-full">
          <div className="bottom-3 absolute right-3">
            <button className="px-3 py-2 bg-slate-600 text-white">
              <Link href="/Roomgroup">Create RM</Link>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
