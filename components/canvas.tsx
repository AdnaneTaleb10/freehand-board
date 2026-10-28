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

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value)

    console.log('Selected color:', colorRef.current?.value)
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
    <div className='mt-6 flex w-full gap-4'>
      <div className='min-w-0 flex-1 overflow-hidden rounded-2xl'>
        <ReactSketchCanvas
          ref={canvasRef}
          width='100%'
          height='430px'
          strokeColor={strokeColor}
          canvasColor='transparent'
          className='rounded-2xl! border-purple-500! dark:border-purple-800!'
        />
      </div>

      <aside className='flex shrink-0 flex-col items-center gap-6 py-4'>
        {/* Color picker */}
        <div className='w-full border-b border-purple-200 pb-6 dark:border-purple-900'>
          <div className='flex justify-center'>
            <Button
              size='icon'
              type='button'
              variant='outline'
              className='relative overflow-hidden'
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
          </div>
        </div>

        {/* Drawing mode */}
        <div className='flex w-full flex-col items-center gap-3 border-b border-purple-200 pb-6 dark:border-purple-900'>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handlePenClick}
            disabled={!eraseMode}
            aria-label='Pen'
          >
            <Pen size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleEraseClick}
            disabled={eraseMode}
            aria-label='Eraser'
          >
            <Eraser size={16} />
          </Button>
        </div>

        {/* Actions */}
        <div className='flex flex-col items-center gap-3'>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleUndoClick}
            aria-label='Undo'
          >
            <Undo size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleRedoClick}
            aria-label='Redo'
          >
            <Redo size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleClearClick}
            aria-label='Clear canvas'
          >
            <RotateCcw size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleSave}
            aria-label='Save drawing'
          >
            <Save size={16} />
          </Button>
        </div>
      </aside>
    </div>
  )
}
