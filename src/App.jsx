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
  formatPermutations,
} from './Util/helperFunctions'
import { lightColorArray, darkColorArray } from './Util/colorArrays'
import DuplicatesModeButton from './components/DuplicatesModeButton/DuplicatesModeButton'
import ShowMaxResults from './components/ShowMaxResults/ShowMaxResults'
import HidePermutationsButton from './components/HidePermutationsButton/HidePermutationsButton'

function App() {
  //Constants
  const { theme } = useContext(ThemeContext)

  //Max result size default
  const upperBound = 2500

  //Graphemer
  let splitter = new Graphemer()

  //States
  const [resultText, setResultText] = useState('No Result')
  const [userString, setUserString] = useState('')
  const [sliderValue, setSliderValue] = useState(100)
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
  const [isResultTooLarge, setIsResultTooLarge] = useState(false)
  const [maxResultSize, setMaxResultSize] = useState(upperBound)
  const [isPermutationsHidden, setIsPermutationsHidden] = useState(false)

  //Handler functions
  const handleStringChange = (event) => {
    let stringArray
    if (isUppercase)
      stringArray = splitter.splitGraphemes(event.target.value.toUpperCase())
    else stringArray = splitter.splitGraphemes(event.target.value)

    if (stringArray.length > 15) stringArray = stringArray.slice(0, 15)
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
    setMaxResultSize(upperBound)
  }

  const handleSlotClick = (event) => {
    console.log(event)
  }

  const handleHidePermutations = () => {
    setPermutations([])
    setResultText('Loading...')
    setIsPermutationsHidden(!isPermutationsHidden)
  }

  const handleIncreaseResult = () => {
    setResultText('Loading...')
    if (isPermutationsHidden) setMaxResultSize(combCount + 1)
    else setMaxResultSize(permCount + 1)
  }

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value)
  }

  const handleRChange = (event) => {
    if (event.target.value <= nValue && event.target.value >= 0)
      setRValue(event.target.value)
    else setRValue(nValue)
  }

  const handlePermModeChange = () => {
    setPermutationMode(!isPermutationMode)
    setIsPermutationsHidden(false)
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

    //Halt generation if results exceed maxResultSize
    const tempPermCount = factorial(nValue) / factorial(nValue - rValue)
    const tempCombCount =
      factorial(nValue) / (factorial(rValue) * factorial(nValue - rValue))
    setPermCount(tempPermCount)
    setCombCount(tempCombCount)

    //create unit-color map linking each unit to a unique color
    let upperBound = maxResultSize
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

    //Generate an array of subsets
    let subsets = findSubsets(graphemeArray, rValue)

    //Generate list of permutations or combinations

    //if permutations is greater than upper bound
    if (tempPermCount < upperBound && !isPermutationsHidden) {
      let subsetPermutations = []
      subsets.map((subset) =>
        subsetPermutations.push(...generatePermutations(subset))
      )
      setPermutations(subsetPermutations)
      if (subsetPermutations.length === 0) setResultText('No result')
      setIsResultTooLarge(false)
    } else if (tempPermCount < upperBound && isPermutationsHidden) {
      let subsetPermutations = []
      subsets.map((subset) =>
        subsetPermutations.push(...formatPermutations(subset))
      )
      setPermutations(subsetPermutations)
      if (subsets.length === 0) setResultText('No result')
      setIsResultTooLarge(false)
    } else if (
      tempPermCount > upperBound &&
      tempCombCount < upperBound &&
      isPermutationsHidden
    ) {
      let subsetPermutations = []
      subsets.map((subset) =>
        subsetPermutations.push(...formatPermutations(subset))
      )
      setPermutations(subsetPermutations)
      if (subsets.length === 0) setResultText('No result')
      setIsResultTooLarge(false)
    } else if (tempCombCount > upperBound) {
      setPermutations([])
      setResultText('Large result')
      setIsResultTooLarge(true)
    } else if (tempPermCount > upperBound && !isPermutationMode) {
      let subsetPermutations = []
      subsets.map((subset) =>
        subsetPermutations.push(...formatPermutations(subset))
      )
      setPermutations(subsetPermutations)
      if (subsets.length === 0) setResultText('No result')
      setIsResultTooLarge(true)
    } else {
      setPermutations([])
      setResultText('Large result')
      setIsResultTooLarge(true)
    }
  }, [
    rValue,
    userString,
    theme,
    isPermutationMode,
    maxResultSize,
    isPermutationsHidden,
  ])

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
              <div className='slidecontainer flex flex-start flex-align-center'>
                <span className='smaller-font-size-label'>A</span>
                <input
                  type='range'
                  min='10'
                  max='150'
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className='slider'
                  id='myRange'
                />
                <span className='larger-font-size-label'>A</span>
              </div>
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
                  <Slot
                    key={index}
                    value={unit}
                    color={colorMap[unit]}
                    handleSlotClick={handleSlotClick}
                  />
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
                sliderValue={sliderValue}
              />
            ))}
          </div>
          {permutations.length !== 0 ? (
            ''
          ) : (
            <div className={'bottom-padding flex flex-column flex-wrap'}>
              <h2 className='result-text'>{resultText}</h2>
            </div>
          )}
          <div className='see-all-results flex align-items-center'>
            {isResultTooLarge ? (
              <ShowMaxResults
                handleIncreaseResult={handleIncreaseResult}
                permCount={permCount}
                isPermutationsHidden={isPermutationsHidden}
                combCount={combCount}
              ></ShowMaxResults>
            ) : (
              ''
            )}
          </div>
          <hr></hr>
          <div className='flex flex-space-between flex-align-center logo-div'>
            <div className='flex flex-align-center'>
              <a target='_blank' href='https://www.projectcarver.com'>
                <img src={logo} alt='project carver logo' />
              </a>
              <span className='beta'>BETA</span>
            </div>
            <div className='modes-div flex flex-space-evenly'>
              <span
                className='options-span'
                onClick={handlePermModeChange}
                style={{ cursor: 'pointer' }}
              >
                {isPermutationMode
                  ? 'Mode: Permutations'
                  : 'Mode: Combinations'}
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
              {isPermutationMode ? (
                ''
              ) : (
                <div onClick={handleHidePermutations}>
                  <HidePermutationsButton
                    isPermutationsHidden={isPermutationsHidden}
                  />
                </div>
              )}
            </div>
            <div className='night-mode-button' style={{ cursor: 'pointer' }}>
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
