//Generate all possible combinations from a string
//Generate all possible subsets from an array
export function findSubsets(string, rValue) {
    const array = string.split('')
    const n = array.length
    const r = typeof rValue === 'string' ? parseInt(rValue) : rValue

    let subsets = []
    // Loop through all possible subsets using bit manipulation starting at 1
    for (let i = 1; i < (1 << n); i++) {
        // Loop through all elements of the input array
        let subset = []
        //the r-value for nCr is equal to the number of 1's in the binary representation
        if (bitCount(i) === r){
            for (let j = 0; j < n; j++) {
            // Check if the jth bit is set in the current subset
            if ((i & (1 << j)) !== 0) {
                // If the jth bit is set, add the jth element to the subset
                subset.push(array[j]);
            }
        }
        subsets.push(subset.join(''))
        }
    }
    return subsets
}
// THIS CODE IS IN PART CONTRIBUTED TO YASH AGARWAL(YASHAGARWAL2852002)

function bitCount (num) {
    return (num >>> 0).toString(2).replaceAll("0","").length
}

//Generate an array of permutation objects
//combination: the subset the permutation belongs to
//permutation: the unique permutation of the string
export function generatePermutations(str) {
const subset = str;
const permutations = []
function permute(str, left, right) {
    if (left == right) {
        permutations.push(
            {
            combination : subset,
            permutation : str
            }
        )
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

export function randomizeArray (array) {
    return [...array].sort((a, b) => 0.5 - Math.random())
}