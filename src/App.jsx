import { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './Theme'
import './App.css'
import './index.css'
import logo from './assets/logo.png'
import Slot from './components/Slot/Slot'
import Permutation from './components/Permutation/Permutation'
import NightModeButton from './components/NightModeButton/NightModeButton'
import RFactorial from './components/RFactorial/RFactorial'
import {findSubsets, generatePermutations, randomizeArray} from './components/Util/helperFunctions'

function App() {
  const { theme } = useContext(ThemeContext)
  const lightColorArray = ['#EC6769', '#80D361', '#4498C3', '#D3B461', '##EB7814', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#44C3AE']
  const darkColorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA']

  //STATES
  const [colorArrayState, setColorArrayState] = useState(
    theme === 'dark-theme'
      ? darkColorArray
      : lightColorArray
  )
  const [userString, setUserString] = useState('')
  const [nValue, setNValue] = useState(0)
  const [rValue, setRValue] = useState(0)
  const [colorMap, setColorMap] = useState({})
  const [permutations, setPermutations] = useState([])
  const [permCount, setPermCount] = useState(1)
  const [isPermutationMode, setPermutationMode] = useState(true)

  //Initialize random color array
  const randomColorArray = randomizeArray(colorArrayState)
  const randomColorPoolRef = useRef(randomColorArray)

  //REFS

  //Current ref
  const currentStringArrayRef = useRef([])
  const currentColorsRef = useRef([])

  //Previous ref
  const prevStringArrayRef = useRef([])
  const prevColorsRef = useRef([])

  //Handler functions
  const handleStringChange = event => {
    setUserString(event.target.value.toUpperCase())
    setNValue(event.target.value.length)
    setRValue(event.target.value.length)
  }

  const handleRChange = event => {
    if (event.target.value <= nValue && event.target.value >= 0)
      setRValue(event.target.value)
    else
      setRValue(nValue)
  }

  const handleModeChange = () => {
    setPermutationMode(isPermutationMode ? false : true)
  }

  //Change color array when dark mode is toggled
  useEffect(() => {
    if (theme === 'dark-theme')
      setColorArrayState(darkColorArray)
    else
      setColorArrayState(lightColorArray)
  }, [theme])

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

    //Generate an array of subsets
    let subsets = findSubsets(userString, rValue)
    let subsetPermutations = []

    //Generate permutations of those subsets and push all objects into a single array
    subsets.map ( (subset) =>
      subsetPermutations.push(...generatePermutations(subset, rValue))
    )

    setPermCount(subsetPermutations.length)
    setPermutations(subsetPermutations)

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

  }, [rValue])

  return (
    <>
      {/* Dark Mode Div */}
      <div className={`App ${theme}`}>
        

        <div className='page-div border'>

          <div className='top-padding'>
            
            <div className='flex flex-start flex-align-center logo-div'>
              <a href="https://www.projectcarver.com"><img src={logo} alt="project carver logo" /></a>
              <span className='beta'>BETA</span>
              <div className="night-mode-button"><NightModeButton ></NightModeButton></div>
              
            </div>

            <div className='flex flex-start flex-align-center title-div'>
              <h1>Linear Combinatorics Visualizer</h1>
              <form>
                  <label htmlFor="userString"></label>
                  <input value={userString} onChange={handleStringChange} id="userString" placeholder='enter a string...' maxLength='6'/>
              </form>
            </div>

            <div className='top-bar flex'>
              <div className='notation flex flex-align-center'>
                <h2>
                  <span className='sub'>{nValue === 0 ? 'n' : nValue} </span>
                  <div style={{'display': 'inline'}} onClick={handleModeChange}>
                  {isPermutationMode ? 'P' : 'C'}
                  </div>
                  <form>
                    <label htmlFor="rInput"></label>
                    <input className='r-input-sub' type="number" value={rValue} onChange={handleRChange} id="rInput" placeholder='set r...' maxLength='1'/>
                  </form>
                  {/* <span className='sub'>{nValue === 0 ? 'r' : rValue}</span> */}
                </h2>
              </div>

              <div className='formula flex'>
                <table>
                  <tbody>
                    <tr><td>{nValue === 0 ? 'n' : nValue}!</td></tr>
                    <tr><td>
                      {/* <div style={{'display': 'inline'}}>
                        {nValue === 0 ? 'r' : rValue}!
                      </div> */}
                      {isPermutationMode  
                      ? ""
                      : <RFactorial rValue={rValue} nValue={nValue}></RFactorial>
                      }
                      ({nValue === 0 ? 'n' : nValue} - {nValue === 0 ? 'r' : rValue})!</td></tr>
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
                {permutations.map((permutationObject, index) => (
                  <Permutation
                    key={index} 
                    value={permutationObject.permutation}
                    colorMap = {colorMap}
                    nValue={nValue}
                    permCount={permCount} 
                    isParentCombination={permutationObject.isParentCombination}
                    isPermutationMode={isPermutationMode}
                  />
                ))}
            </div>
            {permutations.length !== 0 ? "" :
              <div className={"bottom-padding flex flex-row flex-wrap"}>
                <h3>NO RESULT</h3>
              </div>
            }

        </div> {/* div-page */}
      </div> {/*Dark Mode Div */}
      
    </>
  )
}

export default App
