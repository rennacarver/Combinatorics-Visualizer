import { useState, useEffect } from 'react'
import './App.css'
import Slot from './components/Slot/Slot';

function App() {
  const colorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EA4499', '#831ADE', '#994100', '#B61D1D', '#FFFFFF']
  let randomColorArray = colorArray.sort((a, b) => 0.5 - Math.random())

  const [string, setString] = useState('');
  const handleChange = event => setString(event.target.value)
  

  useEffect(() => {
    console.log(string.slice('')[0])
  })

  return (
    <>
      <div className='top-padding'>

        <div className='flex flex-start flex-align-center'>
          <h1>Linear Combinatorics Visualizer</h1>
          <form>
              <label htmlFor="string"></label>
              <input value={string} onChange={handleChange} id="string" placeholder='enter a string...' maxLength='10'/>
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

          <div className='slots flex-centered flex'>
            <Slot value={string.slice('')[0] ? string.slice('')[0].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[1] ? string.slice('')[1].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[2] ? string.slice('')[2].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[3] ? string.slice('')[3].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[4] ? string.slice('')[4].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[5] ? string.slice('')[5].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[6] ? string.slice('')[6].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[7] ? string.slice('')[7].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[8] ? string.slice('')[8].toUpperCase() : ''}></Slot>
            <Slot value={string.slice('')[9] ? string.slice('')[9].toUpperCase() : ''}></Slot>
            
          </div>

          </div> {/*  top-bar */}
      </div>  {/*  top-padding */}
    </>
  )
}

export default App
