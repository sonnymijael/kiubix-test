import Link from 'next/link'
import Image from 'next/image'

import ToggleButtonTheme from './ToggleButtonTheme'

export default function Navbar ({ logo, title }) {

  return (
    <>
      <nav className='sticky top-0 transition ease-in-out delay-150 duration-300 bg-white dark:bg-black shadow-lg shadow-gray-100 dark:shadow-gray-900 min-w-full z-20 backdrop-blur-md'>
        <div className='max-w-5xl mx-auto px-4 gap-4 flex justify-between'>
          <div>
            <Link href='/' className='flex items-center py-4 px-2 object-contain'>
              <Image className='rounded-full object-contain hover:object-scale-down h-10 w-10' src={logo} alt='Logo' width={16} height={16} />
              <span className='flex font-semibold text-gray-600 dark:text-gray-200 text-lg ml-2'>{title}</span>
            </Link>
          </div>
          <div className='flex items-center justify-center align-center gap-4'>
            <ToggleButtonTheme />
          </div>
        </div>
      </nav>
    </>
  )
}