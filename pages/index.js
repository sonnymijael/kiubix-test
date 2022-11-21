import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Charts from '../components/Charts'

function Home({ github, information }) {
  const [data, setData] = useState(information)
  const [chart, setCharts] = useState('Line')

  const handleChart = event => {
    setCharts(event.target.value)
  }

  const username = `@` + github.login

  const classComponentBtn = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

  const handleData = (event) => {
    event.preventDefault()

    var list = information
    
    const month = document.forms["form-date"].Month.value;
    const year = document.forms["form-date"].Year.value;
    console.log(month, year)
    
    if (month != "Month"){
      list = list.filter(element => element.Mes == month)
    }

    if (year != "Year"){
      list = list.filter(element => element.Ano == year)
    }

    setData(list)
  }

  return (
    <div className='min-h-[100vh] flex-col w-full bg-neutral-100 dark:bg-gray-900'>
      <Head>
        <title>{username}</title>
        <meta name="description" content={github.bio} />
        <link rel="icon" href={github.avatar_url} />
      </Head>

      <header className='w-full'>
        <Navbar logo={github.avatar_url} title={username} />
      </header>
      
      <main className='min-h-[100%] flex w-full justify-center items-center align-center'>
        <div className='grid justify-items-center p-[2rem] max-w-6xl align-center'>
          <div className='w-full p-5 flex bg-gray-200 dark:bg-gray-800 m-5 rounded-xl justify-between items-center'>
            <select className={classComponentBtn} onChange={handleChart}>
              <option value={null} selected disabled>Tipo de grafico</option>
              <option value="Bar">Barras</option>
              <option value="Pie">Pie</option>
              <option value="Area">Area</option>
            </select>
            <form className='flex gap-2' id="form-date">
              <select name='Month' className={classComponentBtn}>
                <option value={null} selected disabled>Mes</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
              <select name='Year' className={classComponentBtn}>
                <option value={null} selected disabled>Año</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
              </select>
              <button className='bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500' onClick={handleData}>
                Filtrar
              </button>
            </form>
          </div>
          <Charts data={data} option={chart} />
        </div>
      </main>

      <footer className='flex items-center justify-center py-4 text-gray-900 dark:text-neutral-300'>
        <a
          href={github.html_url}
          className='flex'
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className='flex mx-1 dark:text-white'>
            {username}
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps (context) {
  const github = await axios.get('https://api.github.com/users/sonnymijael')
  const information = await axios.get('http://api.simplus.kiubix.biz/api/gaday')

  Promise.all([github, information]).then((values) => {
    console.log(values)
  })

  return {
    props: {
      github: github.data,
      information: information.data
    }
  }
}

export default Home
