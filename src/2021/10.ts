import { loadFileRows } from "../util"

type StartChars = "(" | "[" | "{" | "<"
type StopChars = ")" | "]" | "}" | ">"
type AllChars = StartChars | StopChars

type CommandType = {
  start: StartChars
  stop: StopChars
}

const commandTypes: CommandType[] = [
  { start: "(", stop: ")" },
  { start: "[", stop: "]" },
  { start: "{", stop: "}" },
  { start: "<", stop: ">" }
]
const startChars = commandTypes.map((c) => c.start)
const stopChars = commandTypes.map((c) => c.stop)

const isStartChar = (char: string): char is StartChars =>
  startChars.includes(char as StartChars)

const isStopChar = (char: string): char is StopChars =>
  stopChars.includes(char as StopChars)

const getStartChar = (char: StopChars): StartChars =>
  commandTypes.find((c) => c.stop === char)!.start

const getStopChar = (char: StartChars): StopChars =>
  commandTypes.find((c) => c.start === char)!.stop

type RowResult = {
  isInvalid: boolean
  invalidChar?: StopChars
  isIncomplete: boolean
  addedStopChars?: StopChars[]
}

const validateRow = (row: string): RowResult => {
  const commandStack: Array<AllChars> = []
  console.log("\n", row)
  const chars = row.split("")
  let i = 0

  for (const char of chars) {
    if (isStartChar(char)) {
      commandStack.push(char)
    } else if (isStopChar(char)) {
      const stopChar = char
      const expectedPrevChar = getStartChar(stopChar)
      const prevChar = commandStack.pop()

      if (expectedPrevChar !== prevChar) {
        // Invalid closing char
        console.log(
          "Invalid stop char",
          stopChar,
          "at index",
          i,
          "because prev char was",
          prevChar,
          "but expected prev char would be",
          expectedPrevChar
        )
        return { isInvalid: true, invalidChar: char, isIncomplete: false }
      }
    }
    i++
  }

  if (commandStack.length > 0) {
    const addedStopChars: StopChars[] = []

    for (const incompleteStartChar of commandStack) {
      if (isStartChar(incompleteStartChar)) {
        const stopChar = getStopChar(incompleteStartChar)
        addedStopChars.push(stopChar)
      }
    }
    addedStopChars.reverse()
    return { isInvalid: false, isIncomplete: true, addedStopChars }
  }

  return { isInvalid: false, isIncomplete: false }
}

const findInvalidLinesAndCountPoints = (data: Array<string>) => {
  const invalidCommandCounter: Record<StopChars, number> = {
    ")": 0,
    "]": 0,
    "}": 0,
    ">": 0
  }
  for (const row of data) {
    const result = validateRow(row)
    if (result.isInvalid) {
      invalidCommandCounter[result.invalidChar!]++
    }
  }

  let result = 0
  result += invalidCommandCounter[")"] * 3
  result += invalidCommandCounter["]"] * 57
  result += invalidCommandCounter["}"] * 1197
  result += invalidCommandCounter[">"] * 25137

  return { result }
}

const findIncompleteLinesAndCountPoints = (data: Array<string>) => {
  const incompleteRowsAddedChars: {
    row: string
    addedStopChars: StopChars[]
  }[] = []

  for (const row of data) {
    const result = validateRow(row)
    if (result.isIncomplete && result.addedStopChars!.length > 0) {
      incompleteRowsAddedChars.push({
        row,
        addedStopChars: result.addedStopChars!
      })
    }
  }

  const pointsByRow = incompleteRowsAddedChars.map((chars) => {
    let points = 0
    for (const char of chars.addedStopChars) {
      switch (char) {
        case ")":
          points = points * 5 + 1
          break

        case "]":
          points = points * 5 + 2
          break

        case "}":
          points = points * 5 + 3
          break
        case ">":
          points = points * 5 + 4
          break
      }
    }
    return { addedStopChars: chars.addedStopChars, points, row: chars.row }
  })

  console.log("Points by incomplete row:")
  for (const row of pointsByRow) {
    console.log("\n", row.row)
    console.log(row.addedStopChars.join(""), "points:", row.points)
  }

  const sortedPoints = pointsByRow.sort((a, b) => a.points - b.points)

  console.log("Sorted points:")
  for (const row of sortedPoints) {
    console.log(row.points)
  }

  const result = sortedPoints[Math.floor(pointsByRow.length / 2)].points

  return { result }
}

/**
 * @see https://adventofcode.com/2021/day/10
 */
export const day10_2021 = () => {
  console.log("2021 Day 10 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 10, "example.txt")
  const result1 = findInvalidLinesAndCountPoints(exampleData)
  console.log("Result (should be 26397):", result1.result)

  console.log("\n2021 Day 10 puzzle 1:")
  const data = loadFileRows(2021, 10, "data.txt")
  const result2 = findInvalidLinesAndCountPoints(data)
  console.log("Result:", result2.result)

  console.log("\n2021 Day 10 puzzle 2 example:")
  const result3 = findIncompleteLinesAndCountPoints(exampleData)
  console.log("Result (should be 288957):", result3.result)

  console.log("\n2021 Day 10 puzzle 2:")
  const result4 = findIncompleteLinesAndCountPoints(data)
  console.log("Result:", result4.result)
}
