import React, { Suspense } from 'react'
import BlogMultiple from './components/Content/Blog/Blog-multiple'
import Home from './components/public/Home'
import Models from './components/3D/Models'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
      <Home />
      <Suspense fallback={<div>Loading...</div>}>
      <Models/>
      </Suspense>
    </div>
  )
}