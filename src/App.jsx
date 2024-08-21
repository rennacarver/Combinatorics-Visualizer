import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='top-padding'>
        <h1>Linear Combinatorics Visualizer</h1>

        <div className='top-bar'>
          <div className='notation flex-centered'>
            <h2><span className='sub'>n</span>P<span className='sub'>r</span></h2>
          </div>

          <div className='formula flex-centered'>
            <table>
              <tr><td>n!</td></tr>
              <tr><td>(n - r)!</td></tr>
            </table>
          </div>

          <div className='slots flex-centered'>__ __ __ __ __ __ __ __ __ __</div>

        </div>
      </div>
    </>
  )
}

export default App
