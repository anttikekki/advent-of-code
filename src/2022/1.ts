import { loadFileRows } from "../util"

const calculateElfCaloriesSums = (data: string[]): number[] => {
  const elfCalories: number[] = []
  let sum = 0
  data.forEach((row) => {
    const calories = parseInt(row)
    if (!isNaN(calories)) {
      sum += calories
    } else {
      elfCalories.push(sum)
      sum = 0
    }
  })

  if (sum != 0) {
    elfCalories.push(sum)
  }
  return elfCalories
}

const findMaxCalories = (elfCalories: number[]): number => {
  return Math.max(...elfCalories)
}

const sumTopThreeElfCalories = (elfCalories: number[]): number => {
  elfCalories.sort((a, b) => a - b).reverse()
  const topThree = elfCalories.slice(0, 3)
  console.info(`Top three: ${topThree}`)
  return topThree.reduce((acc, value) => acc + value, 0)
}

/**
 * @see https://adventofcode.com/2022/day/1
 */
export const day1_2022 = () => {
  console.log("2022 Day 1 puzzle 1 example:")
  const exampleData = loadFileRows(2022, 1, "example.txt")
  const example1Result = findMaxCalories(calculateElfCaloriesSums(exampleData))
  console.log("Result (should be 24000):", example1Result)

  console.log("\n2022 Day 1 puzzle 1:")
  const data = loadFileRows(2022, 1, "data.txt")
  const result1 = findMaxCalories(calculateElfCaloriesSums(data))
  console.log("Result (should be 72511):", result1)

  console.log("\n2022 Day 1 puzzle 2 example:")
  const example2Result = sumTopThreeElfCalories(
    calculateElfCaloriesSums(exampleData)
  )
  console.log("Result (should be 45000):", example2Result)

  console.log("\n2022 Day 1 puzzle 2:")
  const result2 = sumTopThreeElfCalories(calculateElfCaloriesSums(data))
  console.log("Result (should be 212117):", result2)
}
