import { loadFileRows } from "../util"

const calculate = (data: Array<string>, days: number, printLog: boolean) => {
  let fishes: Array<number> = data[0].split(",").map(Number)
  printLog ? console.log("Initial state: ", fishes.join(", ")) : undefined

  for (let day = 1; day <= days; day++) {
    let newFishes: Array<number> = []
    fishes = fishes.map((fish) => {
      if (fish === 0) {
        newFishes.push(8)
        return 6
      }
      fish--
      return fish
    })
    fishes = [...fishes, ...newFishes]
    printLog
      ? console.log("After", day, " day: ", fishes.join(", "))
      : undefined
  }
  return { fishes }
}

/**
 * @see https://adventofcode.com/2021/day/6
 */
export const day6_2021 = () => {
  console.log("2021 Day 6 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 6, "example.txt")
  console.log(
    "Result (should be 26):",
    calculate(exampleData, 18, true).fishes.length
  )
  console.log(
    "Result (should be 5934):",
    calculate(exampleData, 80, false).fishes.length
  )

  console.log("\n2021 Day 6 puzzle 1:")
  const data = loadFileRows(2021, 6, "data.txt")
  console.log("Result:", calculate(data, 80, false).fishes.length)
}
