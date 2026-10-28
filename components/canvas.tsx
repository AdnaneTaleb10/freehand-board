'use client'

import { useRef, useState } from 'react'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'

export default function Canvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const colorRef = useRef<HTMLInputElement>(null)
  const [strokeColor, setStrokeColor] = useState('#a855f7')

  return (
    <div className='mt-6 flex gap-4'>
      <ReactSketchCanvas
        width='100%'
        height='430px'
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor='transparent'
        className='rounded-2xl! border-purple-500! dark:border-purple-800!'
      />
    </div>
  )
}
