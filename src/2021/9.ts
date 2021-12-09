import { loadFileRows } from "../util"

const findLowPointsAndCalculateSum = (data: Array<string>) => {
  const map = data.map((row) => row.split("").map(Number))
  const maxY = map.length - 1
  const lowPoints: number[] = []

  for (let y = 0; y < map.length; y++) {
    const row = map[y]
    for (let x = 0; x < row.length; x++) {
      const maxX = row.length - 1
      const top = y >= 1 ? map[y - 1][x] : undefined
      const bottom = y < maxY ? map[y + 1][x] : undefined
      const left = x >= 1 ? row[x - 1] : undefined
      const right = x < maxX ? row[x + 1] : undefined
      const current = row[x]

      const adjacent = [top, bottom, left, right].filter(
        (v): v is number => v !== undefined
      )
      if (adjacent.every((v) => v > current)) {
        lowPoints.push(current)
      }
    }
  }

  const result = lowPoints
    .map((v) => v + 1)
    .reduce((acc, current) => acc + current, 0)
  return { result }
}

/**
 * @see https://adventofcode.com/2021/day/9
 */
export const day9_2021 = () => {
  console.log("2021 Day9 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 9, "example.txt")
  const result1 = findLowPointsAndCalculateSum(exampleData)
  console.log("Low point sum (should be 15):", result1.result)

  console.log("\n2021 Day9 puzzle 1:")
  const data = loadFileRows(2021, 9, "data.txt")
  const result2 = findLowPointsAndCalculateSum(data)
  console.log("Low point sum:", result2.result)
}
