"use client"
import React from 'react'
import {signOut} from "next-auth/react"
import { useSession } from 'next-auth/react'
export default function Dashboard() {
  const {data:session} = useSession()
  const user = session?.user
  const handleSignOut  =  ()=>{
    signOut({callbackUrl: "/login" })

  }
  return (
    <div>welcome to Dashboard
    <button onClick={handleSignOut}>sign out</button>
   <p> {user?.email}</p>
    </div>
  )
}
