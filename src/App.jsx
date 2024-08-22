import { useState, useEffect, useRef } from 'react'
import './App.css'
import Slot from './components/Slot/Slot';

function App() {
  const colorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA'] 
  const randomColorArray = randomizeArray(colorArray)
  const randomColorPoolRef = useRef(randomColorArray)

  //STATES
  const [userString, setUserString] = useState('');

  //REFS
  //Current ref
  const currentStringArrayRef = useRef([])
  const currentColorsRef = useRef([]);

  //Previous ref
  const prevStringArrayRef = useRef([])
  const prevColorsRef = useRef([]);

  //Handler functions
  const handleChange = event => setUserString(event.target.value)

  useEffect(() => {
    //Set previous state and set current state to latest input
    //console.log(`prevColorsRef.current = ${prevColorsRef.current}`)
    //console.log(`currentColorsRef.current = ${currentColorsRef.current}`)
    prevColorsRef.current = [...currentColorsRef.current]
    currentColorsRef.current = []
    prevStringArrayRef.current = currentStringArrayRef.current
    currentStringArrayRef.current = userString.split('')
    //console.log(`prevStringArrayRef = ${prevStringArrayRef.current}`)
    //console.log(`currentStringArrayRef = ${currentStringArrayRef.current}`)

    //if input is empty, randomize the color array
    if(userString.length === 0) {
      randomColorPoolRef.current = randomColorArray
    }

    for (let i=0; i<userString.length; i++){
      if (currentStringArrayRef.current[i] === prevStringArrayRef.current[i]){
        //console.log(`the ${i} element is the same as last time!`)
        currentColorsRef.current.push(prevColorsRef.current[i])
      } else{
        //console.log(`the ${i} element is the different from last time!`)
        if(prevColorsRef.current[i]){
          randomColorPoolRef.current.push(prevColorsRef.current[i])
          //console.log('unused color pushed back to pool')
        }
        randomColorPoolRef.current = randomizeArray(randomColorPoolRef.current)
        //console.log(`randomColorPoolRef.current = ${randomColorPoolRef.current}`)
        currentColorsRef.current.push(randomColorPoolRef.current.pop())
      }
    }

    //if new input is shorter than old output, release those colors back into the pool
    for (let k = currentColorsRef.current.length; k<prevColorsRef.current.length; k++){
      randomColorPoolRef.current.push(prevColorsRef.current[k])
      //console.log(`pushing ${prevColorsRef.current[k]} back into the pool`)
      //console.log(`k=${k}`)
    }

    // console.log(`prevColorsRef.current = ${prevColorsRef.current}`)
    // console.log(`currentColorsRef.current = ${currentColorsRef.current}`)
    // console.log(`randomColorPoolRef.current = ${randomColorPoolRef.current}`)
    // console.log('-----------------------------')

  }, [userString])

  function randomizeArray (array) {
    return [...array].sort((a, b) => 0.5 - Math.random())
  }

  return (
    <>
      <div className='top-padding'>

        <div className='flex flex-start flex-align-center'>
          <h1>Linear Combinatorics Visualizer</h1>
          <form>
              <label htmlFor="userString"></label>
              <input value={userString} onChange={handleChange} id="userString" placeholder='enter a string...' maxLength='10'/>
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
            <Slot 
              value={userString.slice('')[0] ? userString.slice('')[0].toUpperCase() : ''}
              color={currentColorsRef.current[0] ? currentColorsRef.current[0] : ''}
            />
            <Slot 
              value={userString.slice('')[1] ? userString.slice('')[1].toUpperCase() : ''}
              color={currentColorsRef.current[1] ? currentColorsRef.current[1] : ''}
            />
            <Slot 
              value={userString.slice('')[2] ? userString.slice('')[2].toUpperCase() : ''}
              color={currentColorsRef.current[2] ? currentColorsRef.current[2] : ''}
            />
            <Slot 
              value={userString.slice('')[3] ? userString.slice('')[3].toUpperCase() : ''}
              color={currentColorsRef.current[3] ? currentColorsRef.current[3] : ''}
            />
            <Slot 
              value={userString.slice('')[4] ? userString.slice('')[4].toUpperCase() : ''}
              color={currentColorsRef.current[4] ? currentColorsRef.current[4] : ''}
            />
            <Slot 
              value={userString.slice('')[5] ? userString.slice('')[5].toUpperCase() : ''}
              color={currentColorsRef.current[5] ? currentColorsRef.current[5] : ''}
            />
            <Slot 
              value={userString.slice('')[6] ? userString.slice('')[6].toUpperCase() : ''}
              color={currentColorsRef.current[6] ? currentColorsRef.current[6] : ''}
            />
            <Slot 
              value={userString.slice('')[7] ? userString.slice('')[7].toUpperCase() : ''}
              color={currentColorsRef.current[7] ? currentColorsRef.current[7] : ''}
            />
            <Slot 
              value={userString.slice('')[8] ? userString.slice('')[8].toUpperCase() : ''}
              color={currentColorsRef.current[8] ? currentColorsRef.current[8] : ''}
            />
            <Slot 
              value={userString.slice('')[9] ? userString.slice('')[9].toUpperCase() : ''}
              color={currentColorsRef.current[9] ? currentColorsRef.current[9] : ''}
            />
            
          </div>

          </div> {/*  top-bar */}
      </div>  {/*  top-padding */}
    </>
  )
}

export default App
