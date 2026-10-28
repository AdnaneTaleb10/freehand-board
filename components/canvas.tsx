'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import type { ReactSketchCanvasRef } from 'react-sketch-canvas'
import { Button } from './ui/button'
import { Pen, Eraser, Undo, Redo, RotateCcw, Save } from 'lucide-react'
import { toast } from 'sonner'

export default function Canvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const colorRef = useRef<HTMLInputElement>(null)
  const [strokeColor, setStrokeColor] = useState('#a855f7')
  const [eraseMode, setEraseMode] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [eraserWidth, setEraserWidth] = useState(8)

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value)
  }

  function handleEraseClick() {
    setEraseMode(true)
    canvasRef.current?.eraseMode(true)
  }

  function handlePenClick() {
    setEraseMode(false)
    canvasRef.current?.eraseMode(false)
  }

  function handleUndoClick() {
    canvasRef.current?.undo()
  }

  function handleRedoClick() {
    canvasRef.current?.redo()
  }

  function handleClearClick() {
    canvasRef.current?.clearCanvas()
  }

  async function handleSave() {
    const dataURL = await canvasRef.current?.exportImage('png')

    if (dataURL) {
      const link = Object.assign(document.createElement('a'), {
        href: dataURL,
        style: { display: 'none' },
        download: 'sketch.png'
      })

      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success('Image downloaded successfully!', {
        style: {
          background: '#16a34a',
          color: '#ffffff',
          border: 'none'
        }
      })
    }
  }

  return (
    <div className='flex w-full min-w-0 flex-col gap-3'>
      {/* Compact toolbar */}
      <aside className='flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-purple-200 p-3 dark:border-purple-900'>
        {/* Color picker */}
        <Button
          size='icon'
          type='button'
          variant='outline'
          className='relative shrink-0 cursor-pointer overflow-hidden'
          style={{ backgroundColor: strokeColor }}
          aria-label='Choose stroke color'
        >
          <input
            ref={colorRef}
            type='color'
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            aria-label='Stroke color'
          />
        </Button>

        {/* Drawing mode */}
        <div className='flex items-center gap-2'>
          <Button
            size='icon'
            type='button'
            variant={eraseMode ? 'outline' : 'default'}
            onClick={handlePenClick}
            disabled={!eraseMode}
            className='cursor-pointer'
            aria-label='Pen'
          >
            <Pen size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant={eraseMode ? 'default' : 'outline'}
            onClick={handleEraseClick}
            disabled={eraseMode}
            className='cursor-pointer'
            aria-label='Eraser'
          >
            <Eraser size={16} />
          </Button>
        </div>

        <div className='hidden h-8 border-l border-purple-200 sm:block dark:border-purple-900' />

        {/* Size controls */}
        <div className='flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-3'>
          <label className='flex min-w-32 flex-1 items-center gap-2 text-xs'>
            <span className='shrink-0'>Pen: {strokeWidth}px</span>
            <input
              className='w-full cursor-pointer accent-purple-500'
              type='range'
              min={1}
              max={20}
              value={strokeWidth}
              onChange={event => setStrokeWidth(Number(event.target.value))}
              aria-label='Pen size'
            />
          </label>

          <label className='flex min-w-32 flex-1 items-center gap-2 text-xs'>
            <span className='shrink-0'>Eraser: {eraserWidth}px</span>
            <input
              className='w-full cursor-pointer accent-purple-500'
              type='range'
              min={1}
              max={40}
              value={eraserWidth}
              onChange={event => setEraserWidth(Number(event.target.value))}
              aria-label='Eraser size'
            />
          </label>
        </div>

        <div className='hidden h-8 border-l border-purple-200 sm:block dark:border-purple-900' />

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleUndoClick}
            className='cursor-pointer'
            aria-label='Undo'
          >
            <Undo size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleRedoClick}
            className='cursor-pointer'
            aria-label='Redo'
          >
            <Redo size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleClearClick}
            className='cursor-pointer'
            aria-label='Clear canvas'
          >
            <RotateCcw size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleSave}
            className='cursor-pointer'
            aria-label='Save drawing'
          >
            <Save size={16} />
          </Button>
        </div>
      </aside>

      {/* Drawing area */}
      <div className='min-w-0 overflow-hidden rounded-xl'>
        <ReactSketchCanvas
          ref={canvasRef}
          width='100%'
          height='min(70vh, 600px)'
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          strokeColor={strokeColor}
          canvasColor='transparent'
          className='rounded-xl! border-purple-300! dark:border-purple-800!'
        />
      </div>
    </div>
  )
}
