
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import Loading from '../../components/Loading.jsx';
import useGetMessage from '../../context/useGetMessage.js';
import useGetSocketMessage from '../../context/useGetSocketMessage.js';

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage() //listing incoming messages
  console.log(messages);

  const lastMegRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMegRef.current) {
        lastMegRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className='flex flex-col h-full overflow-y-auto no-scrollbar bg-black'>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 && messages.map((message) => (
          <div key={message._id} ref={lastMegRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className='text-center mt-[20%]'> Say Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
