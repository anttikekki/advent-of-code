import { loadFileRows } from "../util"

type Stat = { number: number; count: number }

const calculate = (data: Array<string>, days: number, printLog: boolean) => {
  const startingFishes: Array<number> = data[0].split(",").map(Number)
  const stats: Array<Stat> = []
  for (const fish of startingFishes) {
    const stat = stats.find((s) => s.number === fish)
    if (stat) {
      stat.count++
    } else {
      stats.push({ number: fish, count: 1 })
    }
  }
  //console.log("Starting stats:", stats)

  for (let day = 1; day <= days; day++) {
    let newFishes = 0
    for (const stat of stats) {
      if (stat.number === 0) {
        newFishes += stat.count
        stat.number = 6
        continue
      }
      stat.number--
    }
    if (newFishes > 0) {
      stats.push({ number: 8, count: newFishes })
    }
    printLog ? console.log("Day ", day, ":", stats) : undefined
  }
  const fishesCount = stats
    .map((f) => f.count)
    .reduce((acc, value) => acc + value, 0)
  return { fishesCount }
}

/**
 * @see https://adventofcode.com/2021/day/6
 */
export const day6_2021 = () => {
  console.log("2021 Day 6 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 6, "example.txt")
  console.log(
    "Result (should be 26):",
    calculate(exampleData, 18, false).fishesCount
  )
  console.log(
    "Result (should be 5934):",
    calculate(exampleData, 80, false).fishesCount
  )

  console.log("\n2021 Day 6 puzzle 1:")
  const data = loadFileRows(2021, 6, "data.txt")
  console.log("Result:", calculate(data, 80, false).fishesCount)

  console.log("\n2021 Day 6 puzzle 2 example:")
  console.log(
    "Result (should be 26984457539):",
    calculate(exampleData, 256, false).fishesCount
  )

  console.log("\n2021 Day 6 puzzle 2:")
  console.log("Result:", calculate(data, 256, false).fishesCount)
}
