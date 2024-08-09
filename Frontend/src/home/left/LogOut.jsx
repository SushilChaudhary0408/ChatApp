import axios from 'axios';
import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie"
import toast from 'react-hot-toast';

function LogOut() {

  const [loading, setLoading] = useState(false)

  const handelLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out Sucessfully");
      window.location.reload();
    } catch (error) {
      // console.log("Error in LogOut", error);
      toast.error("Error in Logged out");
    }
  }
  return (
    <div className='h-[10vh] bg-slate-800'>
      <BiLogOutCircle className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1' onClick={handelLogout} />
    </div>
  )
}

export default LogOut
