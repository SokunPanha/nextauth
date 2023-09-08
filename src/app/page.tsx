
import Image from 'next/image' 
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import User from './components/user'
export default async  function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <pre>
      {JSON.stringify(session) }
      <p>Client side</p>
      <h1>{}</h1>
     <User/>
     
 
     </pre>
    </main>
  )
}
