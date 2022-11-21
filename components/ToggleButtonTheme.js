import { useEffect, useState } from 'react'

const themes = ['light', 'dark']

export default function ToggleButtonTheme () {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    // if (import.meta.env.SSR) {
    //   return undefined
    // }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-color-scheme)').matches){
        return 'dark'
      }
      return 'light'
    }
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div layout className='inline-flex items-center p-[1px] rounded-3xl bg-sky-300 dark:bg-zinc-600'>
      {themes.map(t => {
        const checked = t === theme
        return (
          <button
            key={t}
            className={`${checked ? 'bg-white text-black' : ''} cursor-pointer rounded-3xl p-2 transition ease-in-out delay-150 duration-300`}
            onClick={toggleTheme}
          >
            {t === 'dark' ? (<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'> </path></svg>) : (<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' fillRule='evenodd' clipRule='evenodd'> </path></svg>)}
          </button>
        )
      })}
    </div>
  ) : (<div>s</div>)
}