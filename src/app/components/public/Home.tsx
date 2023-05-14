"use client"
import React from 'react'
import Navbar from '../Constants/Navbar'
import Footer from '../Constants/Footer'
import BlogMultiple from '../Content/Blog/Blog-multiple'
import { auth } from '../../../../firebase.config'

type Props = {}

export default function Home({}: Props) {
  const signOut = () => {
    auth.signOut()
  }
  return (
    <div>
        <Navbar/>
        <button onClick={signOut}>Sign out</button>
        <BlogMultiple/>
        <Footer/>
    </div>
  )
}