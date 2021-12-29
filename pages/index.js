import React, {useContext} from "react";

import { Context } from "../context";

import { useState } from "react";

import {useRouter} from 'next/router'

import axios from 'axios'

export default function Auth() {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    username,
    secret,
    setUsername,
    setSecret,} = useContext(Context)
    function onSubmit (e){
      e.preventDefault()
      if(username.length === 0 || secret.length === 0)return
      axios.put('https://api.chatengine.io/users/',
      {username,secret},
      {headers:{'private-key':`${process.env.CHAT_KEY}`}}
      ).then(res=>router.push('/chats')).catch(error=>setError('sorry there was an error please try again'))
    }
  return <div class="w-full flex flex-wrap">

  <div class="w-full md:w-1/2 flex flex-col">

      <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <a href="#" class="bg-[#7a36e1] text-white font-bold text-xl p-4">Dash Chat</a>
      </div>

      <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p class="text-center text-3xl text-[#7a36e1]">Welcome.</p>
          <form class="flex flex-col pt-3 md:pt-8" onSubmit={e=>onSubmit(e)}>
              <div class="flex flex-col pt-4">
                  <label class="text-lg">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#7a36e1] mt-1 leading-tight focus:outline-none focus:shadow-outline"  onChange={e=>setUsername(e.target.value)}/>
              </div>

              <div class="flex flex-col pt-4">
                  <label class="text-lg">Password</label>
                  <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#7a36e1] mt-1 leading-tight focus:outline-none focus:shadow-outline"  onChange={e=>setSecret(e.target.value)}/>
              </div>

              <input type="submit" value="Log In/Register" class="bg-[#7a36e1] text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
          </form>
          <span className="text-2xl text-red-600 text-center">{error}</span>
      </div>

  </div>
  <div class="w-1/2 shadow-2xl">
      <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
  </div>
</div>
}
