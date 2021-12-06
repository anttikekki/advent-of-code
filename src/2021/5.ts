import { loadFileRows } from "../util"

type Line = {
  x1: number
  y1: number
  x2: number
  y2: number
  horizontal: boolean
  vertical: boolean
  diagonal: boolean
}
type Coordinate = { x: number; y: number; lines: Array<Line> }
type Map = Array<Array<Coordinate>>

const parseLines = (data: Array<string>): Array<Line> => {
  let lines = data
    .map((row) => row.split(" -> "))
    .map((coords) => {
      const coord1 = coords[0].split(",").map(Number)
      const coord2 = coords[1].split(",").map(Number)
      const x1 = coord1[0]
      const y1 = coord1[1]
      const x2 = coord2[0]
      const y2 = coord2[1]
      return {
        x1,
        y1,
        x2,
        y2,
        horizontal: y1 === y2,
        vertical: x1 === x2,
        diagonal: y1 !== y2 && x1 !== x2
      }
    })
  return lines
}

const markCoordinateOnMap = (x: number, y: number, line: Line, map: Map) => {
  if (!map[y]) {
    map[y] = []
  }
  if (!map[y][x]) {
    map[y][x] = { x, y, lines: [] }
  }
  map[y][x].lines.push(line)
}

const drawLinesToMap = (map: Map, lines: Array<Line>) => {
  for (const line of lines) {
    let x = line.x1
    let y = line.y1
    if (line.horizontal) {
      while (x !== line.x2) {
        markCoordinateOnMap(x, y, line, map)
        if (x < line.x2) {
          x++
        }
        if (x > line.x2) {
          x--
        }
        if (x === line.x2) {
          markCoordinateOnMap(x, y, line, map)
        }
      }
    }
    if (line.vertical) {
      while (y !== line.y2) {
        markCoordinateOnMap(x, y, line, map)
        if (y < line.y2) {
          y++
        }
        if (y > line.y2) {
          y--
        }
        if (y === line.y2) {
          markCoordinateOnMap(x, y, line, map)
        }
      }
    }
    if (line.diagonal) {
      while (y !== line.y2 && x !== line.x2) {
        markCoordinateOnMap(x, y, line, map)
        if (x < line.x2) {
          x++
        }
        if (x > line.x2) {
          x--
        }
        if (y < line.y2) {
          y++
        }
        if (y > line.y2) {
          y--
        }
        if (y === line.y2 && x === line.x2) {
          markCoordinateOnMap(x, y, line, map)
        }
      }
    }
  }
}

const calculateCrossingLines = (map: Map): number => {
  let crossingLinesCount = 0
  for (const row of map) {
    if (!row) {
      continue
    }
    for (const coordinate of row) {
      // console.log("calculateCrossingLines() coordinate", coordinate)
      if (coordinate && coordinate.lines.length > 1) {
        crossingLinesCount++
      }
    }
  }
  return crossingLinesCount
}

const findMaxX = (map: Map): number => {
  let maxX = 0
  for (const row of map) {
    if (!row) {
      continue
    }
    for (const coordinate of row) {
      if (coordinate && coordinate.x > maxX) {
        maxX = coordinate.x
      }
    }
  }
  return maxX
}

const printMap = (map: Map) => {
  const maxX = findMaxX(map)
  console.log("Map (max y:", map.length - 1, "max x:", maxX, "):")
  for (const row of map) {
    let rowPrint = ""
    if (!row) {
      console.log(rowPrint)
      continue
    }
    for (let x = 0; x <= maxX; x++) {
      if (row[x]) {
        rowPrint += ` ${row[x].lines.length}`
      } else {
        rowPrint += "  "
      }
    }
    console.log(rowPrint)
  }
}

const calculateHorizontalAndVerticalLines = (data: Array<string>) => {
  const allLines = parseLines(data)
  const horizontalLines = allLines.filter((l) => l.horizontal)
  const verticalLines = allLines.filter((l) => l.vertical)
  const lines = [...horizontalLines, ...verticalLines]

  const map: Map = []
  drawLinesToMap(map, lines)
  const crossingLinesCount = calculateCrossingLines(map)
  return { crossingLinesCount, map, lines }
}

const calculateAllLines = (data: Array<string>) => {
  const lines = parseLines(data)
  const map: Map = []
  drawLinesToMap(map, lines)
  const crossingLinesCount = calculateCrossingLines(map)
  return { crossingLinesCount, map, lines }
}

/**
 * @see https://adventofcode.com/2021/day/5
 */
export const day5_2021 = () => {
  console.log("2021 Day 5 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 5, "example.txt")
  const result1 = calculateHorizontalAndVerticalLines(exampleData)
  console.log("Lines: (should be 5)", result1.lines.length)
  console.log("Result (should be 5):", result1.crossingLinesCount)

  console.log("\n2021 Day 5 puzzle 1:")
  const data = loadFileRows(2021, 5, "data.txt")
  const result2 = calculateHorizontalAndVerticalLines(data)
  console.log("Result:", result2.crossingLinesCount)

  console.log("\n2021 Day 5 puzzle 2 example:")
  const result3 = calculateAllLines(exampleData)
  printMap(result3.map)
  console.log("Lines: (should be 10)", result3.lines.length)
  console.log("Result (should be 12):", result3.crossingLinesCount)

  console.log("\n2021 Day 5 puzzle 2:")
  const result4 = calculateAllLines(data)
  console.log("Result:", result4.crossingLinesCount)
}
