import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pageloopLogo from './assets/pageloop.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://pageloop.com" target="_blank">
          <img src={pageloopLogo} className="logo pageloop" alt="Pageloop logo" />
        </a>
      </div>
      <h1>Pageloop</h1>
      <p className="read-the-docs">
        Still editing manuals manually?
        <br />
        Pageloop spins up the latest in a click!
      </p>
    </>
  )
}

export default App
