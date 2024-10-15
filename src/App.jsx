import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './Theme'
import Graphemer from 'graphemer'
import './App.css'
import './index.css'
import logo from './assets/logo.png'
import Slot from './components/Slot/Slot'
import Permutation from './components/Permutation/Permutation'
import NightModeButton from './components/NightModeButton/NightModeButton'
import RFactorial from './components/RFactorial/RFactorial'
import {
  findSubsets,
  generatePermutations,
  randomizeArray,
  factorial,
} from './Util/helperFunctions'
import { lightColorArray, darkColorArray } from './Util/colorArrays'
import DuplicatesModeButton from './components/DuplicatesModeButton/DuplicatesModeButton'

function App() {
  //Constants
  const { theme } = useContext(ThemeContext)

  //Graphemer
  let splitter = new Graphemer()

  //States
  const [resultText, setResultText] = useState('No Result')
  const [userString, setUserString] = useState('')
  const [userStringArray, setUserStringArray] = useState([])
  const [graphemeArray, setGraphemeArray] = useState([])
  const [nValue, setNValue] = useState(0)
  const [rValue, setRValue] = useState(0)
  const [colorMap, setColorMap] = useState({})
  const [permutations, setPermutations] = useState([])
  const [permCount, setPermCount] = useState(0)
  const [combCount, setCombCount] = useState(0)
  const [isPermutationMode, setPermutationMode] = useState(true)
  const [isUppercase, setIsUppercase] = useState(true)
  const [isDuplicatesMode, setIsDuplicatesMode] = useState(true)
  const [duplicatesDetected, setDuplicatesDetected] = useState(false)
  const [userStringLength, setUserStringLength] = useState(0)

  //Handler functions
  const handleStringChange = (event) => {
    let stringArray
    if (isUppercase)
      stringArray = splitter.splitGraphemes(event.target.value.toUpperCase())
    else stringArray = splitter.splitGraphemes(event.target.value)

    if (stringArray.length > 10) stringArray = stringArray.slice(0, 10)
    const stringLength = stringArray.length

    //Convert array of graphemes into array of objects
    setDuplicatesDetected(false)
    let graphemeCounter = {}
    let tempArray = []
    for (let i = 0; i < stringLength; i++) {
      let grapheme = stringArray[i]
      if (!graphemeCounter[grapheme]) graphemeCounter[grapheme] = 1
      else graphemeCounter[grapheme] += 1

      if (graphemeCounter[grapheme] > 1) {
        setDuplicatesDetected(true)
      }

      tempArray.push({
        value: stringArray[i],
        duplicateKey: graphemeCounter[grapheme],
      })
    }

    setGraphemeArray(tempArray)

    setUserString(stringArray.join(''))
    setUserStringArray(stringArray)
    setUserStringLength(stringLength)
    setNValue(stringLength)
    setRValue(stringLength)
  }

  const handleRChange = (event) => {
    if (event.target.value <= nValue && event.target.value >= 0)
      setRValue(event.target.value)
    else setRValue(nValue)
  }

  const handlePermModeChange = () => {
    setPermutationMode(!isPermutationMode)
  }

  const handleCaseModeChange = () => {
    setIsUppercase(!isUppercase)
  }

  const handleDuplicatesModeChange = () => {
    setIsDuplicatesMode(!isDuplicatesMode)
  }

  //Generate permutations when the r-value or userString is updated
  useEffect(() => {
    let colorArrayState = {}
    if (theme === 'dark-theme') {
      colorArrayState = darkColorArray
    } else {
      colorArrayState = lightColorArray
    }

    //Halt generation if results exceed 1,000
    const tempPermCount = factorial(nValue) / factorial(nValue - rValue)
    const tempCombCount =
      factorial(nValue) / (factorial(rValue) * factorial(nValue - rValue))
    setPermCount(tempPermCount)
    setCombCount(tempCombCount)

    //create unit-color map linking each unit to a unique color
    let currentKey
    let currentVal
    let tempColorMap = {}
    const randomColorArray = randomizeArray(colorArrayState)

    for (let i = 0; i < userStringLength; i++) {
      currentKey = userStringArray[i]
      currentVal = randomColorArray[i]
      tempColorMap[currentKey] = currentVal
    }

    setColorMap(tempColorMap)

    if (tempPermCount > 1000) {
      setPermutations([])
      setResultText('Result too large')
    } else {
      //Generate an array of subsets
      let subsets = findSubsets(graphemeArray, rValue)

      //Generate permutations of subsets
      let subsetPermutations = []
      subsets.map((subset) =>
        subsetPermutations.push(...generatePermutations(subset))
      )

      setPermutations(subsetPermutations)
      if (subsetPermutations.length === 0) setResultText('No result')
    }
  }, [rValue, userString, theme])

  return (
    <>
      {/* Dark Mode Div */}
      <div className={`App ${theme}`}>
        <div className='page-div border'>
          <div className='top-padding'>
            <div className='flex flex-start flex-align-center title-div'>
              <h1>Linear Combinatorics Visualizer</h1>
              <form>
                <label htmlFor='userString'></label>
                <input
                  value={userString}
                  onChange={handleStringChange}
                  id='userString'
                  placeholder='enter a string...'
                />
              </form>
            </div>
            <div className='top-bar flex flex-start'>
              <div className='notation flex flex-align-center'>
                <h2>
                  <span className='sub'>{nValue === 0 ? 'n' : nValue} </span>
                  <span
                    onClick={handlePermModeChange}
                    style={{ cursor: 'pointer' }}
                  >
                    {isPermutationMode ? 'P' : 'C'}
                  </span>
                  <form>
                    <label htmlFor='rInput'></label>
                    <input
                      className='r-input-sub'
                      type='number'
                      value={rValue}
                      onChange={handleRChange}
                      id='rInput'
                      placeholder='r'
                      maxLength='2'
                    />
                  </form>
                </h2>
              </div>

              <div className='formula flex'>
                <table>
                  <tbody>
                    <tr>
                      <td>{nValue === 0 ? 'n' : nValue}!</td>
                    </tr>
                    <tr>
                      <td>
                        {isPermutationMode ? (
                          ''
                        ) : (
                          <RFactorial
                            rValue={rValue}
                            nValue={nValue}
                          ></RFactorial>
                        )}
                        ({nValue === 0 ? 'n' : nValue} -{' '}
                        {nValue === 0 ? 'r' : rValue})!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='flex-start flex formula-result'>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td> = {isPermutationMode ? permCount : combCount}</td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='slots flex-start flex'>
                {userStringArray.map((unit, index) => (
                  <Slot key={index} value={unit} color={colorMap[unit]} />
                ))}
              </div>
            </div>{' '}
            {/*  top-bar */}
          </div>{' '}
          {/*  top-padding */}
          <div className={'bottom-padding flex flex-row flex-wrap'}>
            {permutations.map((permutation, index) => (
              <Permutation
                key={index}
                permutation={permutation.permutation}
                colorMap={colorMap}
                rValue={rValue}
                permCount={permCount}
                subsetGroup={permutation.subsetGroup}
                permutationGroup={permutation.permutationGroup}
                isPermutationMode={isPermutationMode}
                isDuplicatesMode={isDuplicatesMode}
              />
            ))}
          </div>
          {permutations.length !== 0 ? (
            ''
          ) : (
            <div className={'bottom-padding flex flex-row flex-wrap'}>
              <h3>{resultText}</h3>
            </div>
          )}
          <hr></hr>
          <div className='flex flex-space-between flex-align-center logo-div'>
            <div className='flex flex-align-center'>
              <a target='_blank' href='https://www.projectcarver.com'>
                <img src={logo} alt='project carver logo' />
              </a>
              <span className='beta'>BETA</span>
            </div>
            <span
              className='options-span'
              onClick={handlePermModeChange}
              style={{ cursor: 'pointer' }}
            >
              {isPermutationMode ? 'Mode: Permutations' : 'Mode: Combinations'}
            </span>
            <span
              className='options-span'
              onClick={handleCaseModeChange}
              style={{ cursor: 'pointer' }}
            >
              {isUppercase ? 'Uppercase ON' : 'Uppercase OFF'}
            </span>
            {duplicatesDetected ? (
              <DuplicatesModeButton
                duplicatesDetected={duplicatesDetected}
                isDuplicatesMode={isDuplicatesMode}
                handleDuplicatesModeChange={handleDuplicatesModeChange}
              ></DuplicatesModeButton>
            ) : (
              ''
            )}
            <div className='night-mode-button'>
              <NightModeButton></NightModeButton>
            </div>
          </div>
        </div>{' '}
        {/* div-page */}
      </div>{' '}
      {/*Dark Mode Div */}
    </>
  )
}

export default App
