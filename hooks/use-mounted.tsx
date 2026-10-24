import { useEffect, useState } from 'react'

export default function useMounted() {
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  return mounted
}
