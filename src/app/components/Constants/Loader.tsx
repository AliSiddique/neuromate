import Image from 'next/image'
import React from 'react'

type Props = {}

export default function Loader({}: Props) {
  return (
    <div
    className="flex justify-center items-center h-screen"
    style={{ fontSize: '1rem' }}
  >
    <div className="text-center">
      <Image alt="brain" width={50} height={50} src="/brain.gif" />
    </div>
  </div>
  )
}