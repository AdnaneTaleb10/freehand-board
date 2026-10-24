import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Header() {
  return (
    <header>
      <nav className='flex items-center justify-between'>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  )
}