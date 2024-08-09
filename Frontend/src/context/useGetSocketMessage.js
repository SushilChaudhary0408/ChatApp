import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../zustand/useConversation.js'
import sound from '../sound/facebook-messenger-tone.mp3';

const useGetSocketMessage = () => {
    const {socket} = useSocketContext()
    const {messages, setMessage} = useConversation();

    useEffect (() =>{
        socket.on('newMessage', (newMessage)=>{
            const notifaction = new Audio(sound)
            notifaction.play();
            setMessage([...messages, newMessage]);
        });
        return () => {
            socket.off("newMessage");
        }
    },[socket, messages, setMessage])
 
};

export default useGetSocketMessage;
