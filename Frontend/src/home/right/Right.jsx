
import React, { useEffect } from 'react';
import { CiMenuFries } from "react-icons/ci";
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeSend from './TypeSend';
import useConversation from '../../zustand/useConversation.js';
import { useAuth } from '../../context/AuthProvider.jsx';

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='w-full text-gray-300 bg-slate-900 flex flex-col h-screen'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <ChatUser />
          <div className='flex flex-col h-[calc(100vh-12vh)]'>
            <div className='flex-grow overflow-y-auto'>
              <Messages />
            </div>
            <div className='flex-shrink-0'>
              <TypeSend />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
    <div className='relative'>
      <label htmlFor="my-drawer-2"
      className='btn btn-ghost drawer-button lg:hidden absolute left-5'
      >
        <CiMenuFries className='text-white text-xl' />
      </label>
    </div>
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-center'>
          Welcome <span className='font-semibold text-xl'>{authUser.user.fullname}</span>
          <br />
          No chat selected, please start a conversation by selecting someone from your contacts.
        </h1>
      </div>
    </>
  );
};
