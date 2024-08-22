import { useState, useEffect, useRef } from 'react'
import './App.css'
import Slot from './components/Slot/Slot';
import Permutation from './components/Permutation/Permutation';

function App() {
  const colorArray = ['#EC6769', '#80D361', '#4498C3', '#FAE75F', '#F2A664', '#EC66AB', '#B461D3', '#C36F44', '#5F72FA', '#67ECEA'] 
  const randomColorArray = randomizeArray(colorArray)
  const randomColorPoolRef = useRef(randomColorArray)

  //STATES
  const [userString, setUserString] = useState('');
  const [numSlots, setNumSlots] = useState(0);
  const [stringColors, setstringColors] = useState([]);

  //REFS
  //permutations ref
  const permutationsRef = useRef([])

  //Current ref
  const currentStringArrayRef = useRef([])
  const currentColorsRef = useRef([]);

  //Previous ref
  const prevStringArrayRef = useRef([])
  const prevColorsRef = useRef([]);

  //Handler functions
  const handleChange = event => {
    setUserString(event.target.value)
    setNumSlots(event.target.value.length)
  }

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
    console.log(permutationsRef.current)
    setstringColors([...currentColorsRef.current])

    // console.log(`prevColorsRef.current = ${prevColorsRef.current}`)
    // console.log(`currentColorsRef.current = ${currentColorsRef.current}`)
    // console.log(`randomColorPoolRef.current = ${randomColorPoolRef.current}`)
    // console.log('-----------------------------')

  }, [userString])

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
      <div className='top-padding'>

        <div className='flex flex-start flex-align-center'>
          <h1>Linear Combinatorics Visualizer</h1>
          <form>
              <label htmlFor="userString"></label>
              <input value={userString} onChange={handleChange} id="userString" placeholder='enter a string...' maxLength='8'/>
          </form>
        </div>

        <div className='top-bar flex'>
          <div className='notation flex-centered flex'>
            <h2><span className='sub'>{numSlots === 0 ? 'n' : numSlots} </span>P<span className='sub'>r</span></h2>
          </div>

          <div className='formula flex-centered flex'>
            <table>
              <tbody>
                <tr><td>{numSlots === 0 ? 'n' : numSlots}!</td></tr>
                <tr><td>({numSlots === 0 ? 'n' : numSlots} - r)!</td></tr>
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

      <div className='top-padding'>
            {permutationsRef.current.map((permutation, index) => (
              <Permutation key={index} value={permutation} />
            ))}
      </div> {/*  top-padding */}
    </>
  )
}

export default App
