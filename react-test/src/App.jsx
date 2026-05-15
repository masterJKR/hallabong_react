import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Test from './Test.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Test name="박문수" age="45"/>
    </>
  )
}

export default App
