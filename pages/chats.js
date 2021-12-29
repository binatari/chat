import React, {useState, useEffect, useContext} from "react";

import { Context } from "../context";

import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const  ChatEngine = dynamic(()=>import('react-chat-engine').then((module)=>module.ChatEngine), {ssr:false})
const  MessageFormSocial = dynamic(()=>import('react-chat-engine').then((module)=>module.MessageFormSocial), {ssr:false})
export default function Chats() {
  const {username,secret}=useContext(Context)
  const [showChat, setShowChat] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if (typeof document !== null){
      setShowChat(true);
    }
  })

  useEffect(()=>{
    if (username.length === 0 || secret.length === 0 )router.push('/')
  })


  if (!setShowChat) return <div/>
  return <>
    <div>
      <div className="shadow">
        <ChatEngine
        height='calc(98vh)'
        projectID='907f997f-1016-4334-a62d-57416a90cedb'
        userName={username}
        userSecret={secret}
        />
      </div>
    </div>
  </>;
}
