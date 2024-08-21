import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState('');

  const handleChange = event => setName(event.target.value)

  return (
    <>
      <div className='top-padding'>

        <div className='flex flex-start flex-align-center'>
          <h1>Linear Combinatorics Visualizer</h1>
          <form>
              <label htmlFor="name"></label>
              <input value={name} onChange={handleChange} id="name" placeholder='enter a string...' />
          </form>
        </div>

        <div className='top-bar flex'>
          <div className='notation flex-centered flex'>
            <h2><span className='sub'>n </span>P<span className='sub'>r</span></h2>
          </div>

          <div className='formula flex-centered flex'>
            <table>
              <tbody>
                <tr><td>n!</td></tr>
                <tr><td>(n - r)!</td></tr>
              </tbody>
            </table>
          </div>

          <div className='slots flex-centered flex'>__ __ __ __ __ __ __ __ __ __</div>

          </div> {/*  top-bar */}
          <h1>{name}</h1>
      </div>  {/*  top-padding */}
    </>
  )
}

export default App
