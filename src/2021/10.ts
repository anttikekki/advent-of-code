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

const getNextValidChar = (char: AllChars): StopChars | undefined => {
  if (isStartChar(char)) {
    return commandTypes.find((c) => c.start === char)?.stop
  }
  return undefined
}

const getStartChar = (char: StopChars): StartChars =>
  commandTypes.find((c) => c.stop === char)!.start

const validateRowAndReturnInvalidChar = (
  row: string
): StopChars | undefined => {
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
        return char
      }
    }
    i++
  }
  return undefined
}

const calculate = (data: Array<string>) => {
  const invalidCommandCounter: Record<StopChars, number> = {
    ")": 0,
    "]": 0,
    "}": 0,
    ">": 0
  }
  for (const row of data) {
    const result = validateRowAndReturnInvalidChar(row)
    if (result) {
      invalidCommandCounter[result]++
    }
  }

  let result = 0
  result += invalidCommandCounter[")"] * 3
  result += invalidCommandCounter["]"] * 57
  result += invalidCommandCounter["}"] * 1197
  result += invalidCommandCounter[">"] * 25137

  return { result }
}

/**
 * @see https://adventofcode.com/2021/day/10
 */
export const day10_2021 = () => {
  console.log("2021 Day 10 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 10, "example.txt")
  const result1 = calculate(exampleData)
  console.log("Result (should be 26397):", result1.result)

  console.log("\n2021 Day 10 puzzle 1:")
  const data = loadFileRows(2021, 10, "data.txt")
  const result2 = calculate(data)
  console.log("Result:", result2.result)
}
