
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

function TypeSend() {
  const [message, setMessage] = useState("");
  const { sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-5 p-4 bg-slate-800'>
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered w-full"
      />
      <button type="submit" className='text-3xl'>
        <IoSend />
      </button>
    </form>
  );
}

export default TypeSend;
