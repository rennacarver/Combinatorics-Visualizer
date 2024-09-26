//Generate all possible combinations from a string
//Generate all possible subsets from an array
export function findSubsets(graphemeArray, rValue) {
  const n = graphemeArray.length
  const r = typeof rValue === 'string' ? parseInt(rValue) : rValue

  let subsetCounter = {}
  let subsets = []
  // Loop through all possible subsets using bit manipulation starting at 1
  for (let i = 1; i < 1 << n; i++) {
    // Loop through all elements of the input array
    let subset = []
    let subsetStringArray = []
    //the r-value for nCr is equal to the number of 1's in the binary representation
    if (bitCount(i) === r) {
      for (let j = 0; j < n; j++) {
        // Check if the jth bit is set in the current subset
        if ((i & (1 << j)) !== 0) {
          // If the jth bit is set, add the jth element to the subset
          subset.push(graphemeArray[j])
          subsetStringArray.push(graphemeArray[j].value)
        }
      }

      let subsetString = subsetStringArray.join('')

      if (!subsetCounter[subsetString]) subsetCounter[subsetString] = 1
      else subsetCounter[subsetString] += 1

      subsets.push({
        subset: subset,
        string: subsetString,
        isDuplicateSubset: subsetCounter[subsetString] > 1,
      })
    }
  }
  console.log(subsets)
  console.log(subsetCounter)
  return subsets
}
// THIS CODE IS IN PART CONTRIBUTED TO YASH AGARWAL(YASHAGARWAL2852002)

function bitCount(num) {
  return (num >>> 0).toString(2).replaceAll('0', '').length
}

//Generate an array of permutation objects
export function generatePermutations(subset) {
  const arr = subset

  let res = [[]]

  //generate a 2d array of permutations
  for (let num of arr) {
    const temp = []
    for (let arr of res) {
      for (let i = 0; i <= arr.length; i++) {
        const newArr = [...arr]
        newArr.splice(i, 0, num)
        temp.push(newArr)
      }
    }
    res = temp
  }

  return res
}

export function randomizeArray(array) {
  return [...array].sort((a, b) => 0.5 - Math.random())
}

export function factorial(n, r = 1) {
  if (n === 0) return 1
  while (n > 0) r *= n--
  return r
}
