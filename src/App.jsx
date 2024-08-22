import { useState, useEffect, useRef } from 'react'
import './App.css'
import Slot from './components/Slot/Slot';

function App() {
  const colorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA'] 
  const randomColorArray = randomizeArray(colorArray)
  const randomColorPoolRef = useRef(randomColorArray)

  //STATES
  const [userString, setUserString] = useState('');
  const [stringColors, setstringColors] = useState([]);

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

    setstringColors([...currentColorsRef.current])

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

          <div className='slots flex-start flex'>
            {userString[0] ? 
            <Slot 
              value={userString.slice('')[0] ? userString.slice('')[0].toUpperCase() : ''}
              color={stringColors[0] ? stringColors[0] : ''}
            />
            : ""}

            {userString[1] ? 
            <Slot 
              value={userString.slice('')[1] ? userString.slice('')[1].toUpperCase() : ''}
              color={stringColors[1] ? stringColors[1] : ''}
            />
            : ""}

            {userString[2] ? 
            <Slot 
              value={userString.slice('')[2] ? userString.slice('')[2].toUpperCase() : ''}
              color={stringColors[2] ? stringColors[2] : ''}
            />
            : ""}

            {userString[3] ? 
            <Slot 
              value={userString.slice('')[3] ? userString.slice('')[3].toUpperCase() : ''}
              color={stringColors[3] ? stringColors[3] : ''}
            />
            : ""}

            {userString[4] ?
            <Slot 
              value={userString.slice('')[4] ? userString.slice('')[4].toUpperCase() : ''}
              color={stringColors[4] ? stringColors[4] : ''}
            />
            : ""}

            {userString[5] ?
            <Slot 
              value={userString.slice('')[5] ? userString.slice('')[5].toUpperCase() : ''}
              color={stringColors[5] ? stringColors[5] : ''}
            />
            : ""}

            {userString[6] ?
            <Slot 
              value={userString.slice('')[6] ? userString.slice('')[6].toUpperCase() : ''}
              color={stringColors[6] ? stringColors[6] : ''}
            />
            : ""}

            {userString[7] ?
            <Slot 
              value={userString.slice('')[7] ? userString.slice('')[7].toUpperCase() : ''}
              color={stringColors[7] ? stringColors[7] : ''}
            />
            : ""}

            {userString[8] ?
            <Slot 
              value={userString.slice('')[8] ? userString.slice('')[8].toUpperCase() : ''}
              color={stringColors[8] ? stringColors[8] : ''}
            />
            : ""}

            {userString[9] ?
            <Slot 
              value={userString.slice('')[9] ? userString.slice('')[9].toUpperCase() : ''}
              color={stringColors[9] ? stringColors[9] : ''}
            />
            : ""}
            
          </div>

          </div> {/*  top-bar */}
      </div>  {/*  top-padding */}
    </>
  )
}

export default App
