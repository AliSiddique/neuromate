"use client"
import React from 'react'
import Navbar from '../Constants/Navbar'
import Footer from '../Constants/Footer'
import BlogMultiple from '../Content/Blog/Blog-multiple'
import { auth } from '../../../../firebase.config'

type Props = {}

export default function Home({}: Props) {

  return (
    <div>
        <Navbar/>
        <BlogMultiple/>
        <Footer/>
    </div>
  )
}