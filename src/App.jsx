import { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './Theme'
import './App.css'
import './index.css'
import Slot from './components/Slot/Slot'
import Permutation from './components/Permutation/Permutation'
import logo from './assets/logo.png'
import NightModeButton from './components/NightModeButton/NightModeButton'

function App() {
  const { theme } = useContext(ThemeContext)
  const colorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA'] 
  const randomColorArray = randomizeArray(colorArray)
  const randomColorPoolRef = useRef(randomColorArray)

  //STATES
  const [isDarkMode, setDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? true
        : false
  )
  const [userString, setUserString] = useState('')
  const [numSlots, setNumSlots] = useState(0)
  const [colorMap, setColorMap] = useState({})

  //REFS
  //permutations ref
  const permutationsRef = useRef([])

  //Current ref
  const currentStringArrayRef = useRef([])
  const currentColorsRef = useRef([])

  //Previous ref
  const prevStringArrayRef = useRef([])
  const prevColorsRef = useRef([])

  //Handler functions
  const handleChange = event => {
    setUserString(event.target.value.toUpperCase())
    setNumSlots(event.target.value.length)
  }

  const toggleDarkMode = () => {
    setDarkMode(previous => !previous)
  }

  //Dark Mode Preference Local Storage
  useEffect(() => {
        console.log(`dark mode is on: ${isDarkMode}`)
    }, [isDarkMode])

  //Random Color Picker
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

    permutationsRef.current = generatePermutations(userString)

    //create unit-color map linking each unit to a unique color
    let userStringArray = userString.split('')
    let currentKey;
    let currentVal;
    let tempColorMap = {}

    for (let i = 0; i < userStringArray.length; i++) {
        currentKey = userStringArray[i];
        currentVal = currentColorsRef.current[i];
        tempColorMap[currentKey] = currentVal;    
    }

    setColorMap(tempColorMap)

    // console.log(`prevColorsRef.current = ${prevColorsRef.current}`)
    // console.log(`currentColorsRef.current = ${currentColorsRef.current}`)
    // console.log(`randomColorPoolRef.current = ${randomColorPoolRef.current}`)
    // console.log('-----------------------------')

  }, [userString])


  //FUNCTIONS
  function randomizeArray (array) {
    return [...array].sort((a, b) => 0.5 - Math.random())
  }

  function generatePermutations(str) {
    const permutations = []
    function permute(str, left, right) {
        if (left == right) {
            permutations.push(str)
        } else {
            for (let i = left; i <= right; i++) {
                str = swap(str, left, i)
                permute(str, left + 1, right)
                str = swap(str, left, i)
            }
        }
    }
    function swap(a, i, j) {
        const charArray = a.split("")
        const temp = charArray[i]
        charArray[i] = charArray[j]
        charArray[j] = temp
        return charArray.join("")
    }
    permute(str, 0, str.length - 1)
    return permutations
  }

  return (
    <>
      {/* Dark Mode Div */}
      <div className={`App ${theme}`}>
        <NightModeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}></NightModeButton>

        <div className='page-div border'>

          <div className='top-padding'>
            
            <div className='flex flex-start flex-align-center'>
              <a href="https://www.projectcarver.com"><img src={logo} alt="project carver logo" /></a>
              <span className='beta'>BETA</span>
            </div>

            <div className='flex flex-start flex-align-center'>
              <h1>Linear Permutations Visualizer</h1>
              <form>
                  <label htmlFor="userString"></label>
                  <input value={userString} onChange={handleChange} id="userString" placeholder='enter a string...' maxLength='6'/>
              </form>
            </div>

            <div className='top-bar flex'>
              <div className='notation flex flex-align-center'>
                <h2><span className='sub'>{numSlots === 0 ? 'n' : numSlots} </span>P<span className='sub'>{numSlots === 0 ? 'r' : numSlots}</span></h2>
              </div>

              <div className='formula flex'>
                <table>
                  <tbody>
                    <tr><td>{numSlots === 0 ? 'n' : numSlots}!</td></tr>
                    <tr><td>({numSlots === 0 ? 'n' : numSlots} - {numSlots === 0 ? 'r' : numSlots})!</td></tr>
                  </tbody>
                </table>
              </div>

              <div className='slots flex-start flex'>


                {userString.split('').map((unit, index) => (
                  <Slot 
                    key={index} 
                    value = {unit}
                    color = {colorMap[unit]}
                  />
                ))}
                
              </div>

              </div> {/*  top-bar */}
            </div>  {/*  top-padding */}

            <div className={"bottom-padding flex flex-row flex-wrap"}>
                {permutationsRef.current.map((permutation, index) => (
                  <Permutation 
                    key={index} 
                    colorMap = {colorMap}
                    userString = {userString}
                    value={permutation}
                    numSlots={numSlots} />
                ))}
            </div> 

        </div> {/* div-page */}
      </div> {/*Dark Mode Div */}
      
    </>
  )
}

export default App
