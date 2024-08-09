
import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className='relatve flex gap-4 items-center justify-center h-[14%] bg-slate-800 hover:bg-slate-700 duration-300 rounded-md'>
      <label htmlFor="my-drawer-2"
        className='btn btn-ghost drawer-button lg:hidden absolute left-5'
      >
        <CiMenuFries className='text-white text-xl' />
      </label>
      <div className='flex space-x-4 items-center justify-center h-[8%] bg-slate-800 hover:bg-slate-700 duration-300'>
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
          </div>
        </div>
        <div>
          <h1 className='text-xl'>{selectedConversation.fullname}</h1>
          <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
