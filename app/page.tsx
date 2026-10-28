import Canvas from '@/components/canvas'

export default function Home() {
  return (
    <section className='mx-auto flex h-full w-full max-w-5xl flex-col gap-3 py-3'>
      <div className='shrink-0 text-center'>
        <h1 className='text-3xl font-bold'>Freehand Sketch Canvas</h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Freehand vector drawing for React using SVG.
        </p>
      </div>

      <Canvas />
    </section>
  )
}
