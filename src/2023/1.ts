import { loadFileRows } from "../util"

const calculateSum = (data: string[]) => data.map(row => {
  const numbers = row.split('').filter(char => !isNaN(Number(char))).map(char => Number(char))
  return Number(`${numbers[0]}${numbers[numbers.length -1]}`)
}).reduce((acc, current) => acc + current, 0)

/**
 * @see https://adventofcode.com/2023/day/1
 */
export const day1_2023 = () => {
  console.log("2023 Day 1 puzzle 1 example:")
  const exampleData = loadFileRows(2023, 1, "example.txt")
  console.log("Result (should be 142):", calculateSum(exampleData))

  console.log("2023 Day 1 puzzle 1:")
  const data = loadFileRows(2023, 1, "data.txt")
  console.log("Result (should be ??):", calculateSum(data))
}
