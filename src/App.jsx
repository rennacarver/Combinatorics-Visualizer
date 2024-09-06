import { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './Theme'
import Graphemer from 'graphemer'
import './App.css'
import './index.css'
import logo from './assets/logo.png'
import Slot from './components/Slot/Slot'
import Permutation from './components/Permutation/Permutation'
import NightModeButton from './components/NightModeButton/NightModeButton'
import RFactorial from './components/RFactorial/RFactorial'
import {findSubsets, generatePermutations, randomizeArray} from './components/Util/helperFunctions'

function App() {

  //Constants
  const { theme } = useContext(ThemeContext)
  const lightColorArray = ['#EC6769', '#80D361', '#4498C3', '#D3B461', '##EB7814', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#44C3AE']
  const darkColorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA']

  //Graphemer
  let splitter = new Graphemer();

  //STATES
  const [colorArrayState, setColorArrayState] = useState(
    theme === 'dark-theme'
      ? darkColorArray
      : lightColorArray
  )

  const [userString, setUserString] = useState('')
  const [userStringArray, setUserStringArray] = useState([])
  const [nValue, setNValue] = useState(0)
  const [rValue, setRValue] = useState(0)
  const [colorMap, setColorMap] = useState({})
  const [permutations, setPermutations] = useState([])
  const [permCount, setPermCount] = useState(1)
  const [isPermutationMode, setPermutationMode] = useState(true)
  const [isUppercase, setIsUppercase] = useState(true)
  const [userStringLength, setUserStringLength] = useState(0)

  //Initialize random color array
  const randomColorArray = randomizeArray(colorArrayState)

  //Handler functions
  const handleStringChange = event => {
  let stringArray = splitter.splitGraphemes(event.target.value)
    if (stringArray.length > 6)
      stringArray = stringArray.slice(0, 6)
    const stringLength = stringArray.length

    setUserString(stringArray.join(''))
    setUserStringArray(stringArray)
    setUserStringLength(stringLength)
    setNValue(stringLength)
    setRValue(stringLength)
  }

  const handleRChange = event => {
    if (event.target.value <= nValue && event.target.value >= 0)
      setRValue(event.target.value)
    else
      setRValue(nValue)
  }

  const handlePermModeChange = () => {
    setPermutationMode(!isPermutationMode)
  }

  const handleCaseModeChange = () => {
    setIsUppercase(!isUppercase)
    setUserString(isUppercase ? userString.toUpperCase() : userString.toLowerCase())
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

    //Generate an array of subsets
    let subsets = findSubsets(userString, rValue)

    //Generate permutations of those subsets and push all objects into a single array
    let subsetPermutations = []
    subsets.map ( (subset) =>
      subsetPermutations.push(...generatePermutations(subset))
    )

    setPermCount(subsetPermutations.length)
    setPermutations(subsetPermutations)

    //create unit-color map linking each unit to a unique color
    let currentKey;
    let currentVal;
    let tempColorMap = {}

    for (let i = 0; i < userStringLength; i++) {
        currentKey = userStringArray[i];
        currentVal = randomColorArray[i];
        tempColorMap[currentKey] = currentVal;    
    }

    setColorMap(tempColorMap)

  }, [rValue, userString])

  return (
    <>
      {/* Dark Mode Div */}
      <div className={`App ${theme}`}>
        

        <div className='page-div border'>

          <div className='top-padding'>

            <div className='flex flex-start flex-align-center title-div'>
              <h1>Linear Combinatorics Visualizer</h1>
              <form>
                  <label htmlFor="userString"></label>
                  <input value={userString} onChange={handleStringChange} id="userString" placeholder='enter a string...' maxLength='10'/>
              </form>
            </div>

            <div className='flex flex-start flex-align center flex-space-around mode-selectors-div'>
              <span onClick={handlePermModeChange} style={{cursor:'pointer'}}>
                  {isPermutationMode ? 'Permutations' : 'Combinations'}
              </span>
              <span onClick={handleCaseModeChange} style={{cursor:'pointer'}}>
                  {isUppercase ? 'Uppercase' : 'Lowercase'}
              </span>

            </div>

            <div className='top-bar flex'>
              <div className='notation flex flex-align-center'>
                <h2>
                  <span className='sub'>{nValue === 0 ? 'n' : nValue} </span>
                  <span onClick={handlePermModeChange} style={{cursor:'pointer'}}>
                  {isPermutationMode ? 'P' : 'C'}
                  </span>
                  <form>
                    <label htmlFor="rInput"></label>
                    <input className='r-input-sub' type="number" value={rValue} onChange={handleRChange} id="rInput" placeholder='set r...' maxLength='1'/>
                  </form>
                </h2>
              </div>

              <div className='formula flex'>
                <table>
                  <tbody>
                    <tr><td>{nValue === 0 ? 'n' : nValue}!</td></tr>
                    <tr><td>
                      {isPermutationMode  
                      ? ""
                      : <RFactorial rValue={rValue} nValue={nValue}></RFactorial>
                      }
                      ({nValue === 0 ? 'n' : nValue} - {nValue === 0 ? 'r' : rValue})!</td></tr>
                  </tbody>
                </table>
              </div>

              <div className='slots flex-start flex'>


                {userStringArray.map((unit, index) => (
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

            <hr></hr>
            <div className='flex flex-space-between flex-align-center logo-div'>
              <div className='flex flex-align-center'>
                <a href="https://www.projectcarver.com"><img src={logo} alt="project carver logo" /></a>
                <span className='beta'>BETA</span>
              </div>
              <span className='perm'>Total Permutations: {permCount}</span>
              <div className="night-mode-button"><NightModeButton></NightModeButton></div>
            </div>

        </div> {/* div-page */}
      </div> {/*Dark Mode Div */}
      
    </>
  )
}

export default App
