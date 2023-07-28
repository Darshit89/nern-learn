import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='App'>
      <Register/>
    </main>
  )
}

export default App
