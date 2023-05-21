"use client"
import React from 'react'
import { useAuthContext } from '../components/context/useAuthContext'
import { useRouter } from 'next/navigation'
import Models from '../components/3D/Models'

type Props = {}
const fetchUser = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await res.json()
  return json
}

export default function page({}: Props) {
  // const some = fetchUser()
  // console.log(some);
  // const { user } = useAuthContext()
  // const router = useRouter()
  // React.useEffect(() => {
  //   if (user == null) router.push("/users/login")
  //   console.log(user);
    
// }, [user])
  return (
    <div className='h-screen'>
      <Models scale={10} />
    </div>
  )
}