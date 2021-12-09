import { loadFileRows } from "../util"

type Coordinate = {
  x: number
  y: number
  depth: number
}

const coord = (x: number, y: number, map: number[][]): Coordinate => ({
  x,
  y,
  depth: map[y][x]
})

const getAdjecent = (x: number, y: number, map: number[][]): Coordinate[] => {
  const row = map[y]
  const maxY = map.length - 1
  const maxX = row.length - 1

  const top = y >= 1 ? coord(x, y - 1, map) : undefined
  const bottom = y < maxY ? coord(x, y + 1, map) : undefined
  const left = x >= 1 ? coord(x - 1, y, map) : undefined
  const right = x < maxX ? coord(x + 1, y, map) : undefined

  return [top, bottom, left, right].filter(
    (v): v is Coordinate => v !== undefined
  )
}

const findLowPointsAndCalculateSum = (data: Array<string>) => {
  const map = data.map((row) => row.split("").map(Number))
  const lowPoints: number[] = []

  for (let y = 0; y < map.length; y++) {
    const row = map[y]
    for (let x = 0; x < row.length; x++) {
      const current = row[x]
      const adjacent = getAdjecent(x, y, map).map((c) => c.depth)

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

const isXYInBasin = (x: number, y: number, basin: Coordinate[]): boolean => {
  return (
    basin.find(
      (basinCoordinate) => basinCoordinate.x === x && basinCoordinate.y === y
    ) !== undefined
  )
}

const isCoordinateInBasin = (
  coordinate: Coordinate,
  basin: Coordinate[]
): boolean => isXYInBasin(coordinate.x, coordinate.y, basin)

const getNewRaisingBasinCoordinates = (
  currentCoord: Coordinate,
  basin: Coordinate[],
  adjecent: Coordinate[]
) => {
  return adjecent
    .filter((a) => !isCoordinateInBasin(a, basin))
    .filter((a) => a.depth !== 9)
    .filter((a) => a.depth === currentCoord.depth + 1)
}

const findFullBasinForCoordinate = (
  x: number,
  y: number,
  map: number[][]
): Coordinate[] => {
  const currentCoord = coord(x, y, map)
  const basin: Coordinate[] = [currentCoord]
  let coordinatesToCheck: Coordinate[] = [currentCoord]

  while (coordinatesToCheck.length > 0) {
    let nextCoordinatesToCheck: Coordinate[] = []

    for (const coordinateToCheck of coordinatesToCheck) {
      const adjacent = getAdjecent(
        coordinateToCheck.x,
        coordinateToCheck.y,
        map
      )
      /*console.log(
        "Adjecents to x",
        coordinateToCheck.x,
        "y",
        coordinateToCheck.y,
        ":",
        adjacent
      )*/
      const newBasinCoords = getNewRaisingBasinCoordinates(
        coordinateToCheck,
        basin,
        adjacent
      )
      basin.push(...newBasinCoords)
      //console.log("Added new coordinates to basin", newBasinCoords)
      nextCoordinatesToCheck.push(...newBasinCoords)
    }
    coordinatesToCheck = nextCoordinatesToCheck
    //console.log("Starting new round to check", nextCoordinatesToCheck)
  }
  /*console.log(
    "Basin for x",
    x,
    "y",
    y,
    " is ready: length",
    basin.length,
    ", coordinates:",
    basin
  )*/
  return basin
}

const findThreeLargestBasinsAndMultiplySizes = (data: Array<string>) => {
  const map = data.map((row) => row.split("").map(Number))
  const basins: Coordinate[][] = []

  for (let y = 0; y < map.length; y++) {
    const row = map[y]
    for (let x = 0; x < row.length; x++) {
      // console.log("\nx", x, "y", y, "depth", row[x])
      if (basins.some((basin) => isXYInBasin(x, y, basin))) {
        // console.log("Is in basin, skipping")
        continue
      }
      basins.push(findFullBasinForCoordinate(x, y, map))
    }
  }

  const topThree = basins
    .sort((a, b) => b.length - a.length)
    .filter((_, i) => i === 0 || i === 1 || i === 2)

  console.log("Top three largest basins", topThree)
  topThree.forEach((b) => drawBasinToMap(b, map))

  const result = topThree
    .map((basin) => basin.length)
    .reduce((acc, current) => acc * current, 1)

  return { result }
}

const drawBasinToMap = (basin: Coordinate[], map: number[][]) => {
  console.log("\nBasin (length", basin.length, "):")
  for (let y = 0; y < map.length; y++) {
    let row = ""
    for (let x = 0; x < map[y].length; x++) {
      row += basin.find((c) => c.y === y && c.x === x)?.depth ?? " "
    }
    console.log(row)
  }
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

  console.log("\n2021 Day9 puzzle 2 example:")
  const result3 = findThreeLargestBasinsAndMultiplySizes(exampleData)
  console.log("Three largest basins (should be 1134):", result3.result)

  console.log("\n2021 Day9 puzzle 2:")
  const result4 = findThreeLargestBasinsAndMultiplySizes(data)
  console.log("Three largest basins:", result4.result)
}
