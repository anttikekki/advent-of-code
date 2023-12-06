import { loadFileRows } from "../util"

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const calculateSumV1 = (data: string[]) =>
  data
    .map((row) => {
      const numbers = row
        .split("")
        .filter((char) => !isNaN(Number(char)))
        .map((char) => Number(char))
      return Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
    })
    .reduce((acc, current) => acc + current, 0)

const calculateSumV2 = (data: string[]) =>
  data
    .map((row, rowIndex) => {
      const numbers: number[] = []

      for (let index = 0; index < row.length; index++) {
        const char = row[index]
        if (!isNaN(Number(char))) {
          numbers.push(Number(char))
        }
        for (const numberString of Object.keys(numberMap)) {
          if (row.startsWith(numberString, index)) {
            numbers.push(numberMap[numberString])
          }
        }
      }
      const result = Number(`${numbers[0]}${numbers[numbers.length - 1]}`)
      //console.log(`Row ${rowIndex} result`, result)
      return result
    })
    .reduce((acc, current) => acc + current, 0)

/**
 * @see https://adventofcode.com/2023/day/1
 */
export const day1_2023 = () => {
  console.log("2023 Day 1 puzzle 1 example:")
  const exampleData = loadFileRows(2023, 1, "example.txt")
  console.log("Result (should be 142):", calculateSumV1(exampleData))

  console.log("2023 Day 1 puzzle 1:")
  const data = loadFileRows(2023, 1, "data.txt")
  console.log("Result (should be 53921):", calculateSumV1(data))

  console.log("2023 Day 1 puzzle 2 example:")
  const exampleData2 = loadFileRows(2023, 1, "example2.txt")
  console.log("Result (should be 281):", calculateSumV2(exampleData2))

  console.log("2023 Day 1 puzzle 2:")
  console.log("Result (should be 54676):", calculateSumV2(data))
}
