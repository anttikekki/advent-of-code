import { loadFileRows } from "../util"

/*
  199 (N/A - no previous measurement)
  200 (increased)
  208 (increased)
  210 (increased)
  200 (decreased)
  207 (increased)
  240 (increased)
  269 (increased)
  260 (decreased)
  263 (increased)
  */
const calculateDepthIncrementCount = (depthMeasurement: Array<number>) => {
  let prevDepth: number | undefined
  let depthIncrements = 0
  for (const depth of depthMeasurement) {
    if (prevDepth === undefined) {
      prevDepth = depth
      continue
    }
    if (depth > prevDepth) {
      depthIncrements++
    }
    prevDepth = depth
  }
  return depthIncrements
}

/*
  199  A      
  200  A B    
  208  A B C  
  210    B C D
  200  E   C D
  207  E F   D
  240  E F G  
  269    F G H
  260      G H
  263        H
  */
const calculateDepthIncrementThreeMeasurementSlidingWindow = (
  depthMeasurement: Array<number>
) => {
  const result: Array<number> = []
  let i = 0
  for (const depth of depthMeasurement) {
    result[i] = depth
    if (result[i - 1] !== undefined) {
      result[i - 1] += depth
    }
    if (result[i - 2] !== undefined) {
      result[i - 2] += depth
    }
    i++
  }
  return calculateDepthIncrementCount(result)
}

export const day1_2021 = () => {
  console.log("2021 Day 1 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 1, "example.txt").map(Number)
  const example1Result = calculateDepthIncrementCount(exampleData)
  console.log("Result (should be 7):", example1Result)

  console.log("\n2021 Day 1 puzzle 1:")
  const puzzleData = loadFileRows(2021, 1, "data.txt").map(Number)
  const puzzle1Result = calculateDepthIncrementCount(puzzleData)
  console.log("Result (should be 1390):", puzzle1Result)

  console.log("\n2021 Day 1 puzzle 2 example:")
  const example2Result =
    calculateDepthIncrementThreeMeasurementSlidingWindow(exampleData)
  console.log("Result (should be 5):", example2Result)

  console.log("\n2021 Day 1 puzzle 2:")
  const puzzle22Result =
    calculateDepthIncrementThreeMeasurementSlidingWindow(puzzleData)
  console.log("Result (should be 1457):", puzzle22Result)
}
