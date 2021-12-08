import { loadFileRows } from "../util"

enum SignalLength {
  One = 2,
  Four = 4,
  Seven = 3,
  Eight = 7
}

const calculate = (data: Array<string>) => {
  const result: Array<number> = []
  result[SignalLength.One] = 0
  result[SignalLength.Four] = 0
  result[SignalLength.Seven] = 0
  result[SignalLength.Eight] = 0

  for (const row of data) {
    const [tenUniqueSignalPatters, fourDigitOutput] = row.split(" | ")
    const signalPatterns = tenUniqueSignalPatters.split(" ")
    const outputDigits = fourDigitOutput.split(" ")

    for (const outputDigit of outputDigits) {
      switch (outputDigit.length) {
        case SignalLength.One:
          result[SignalLength.One]++
          break
        case SignalLength.Four:
          result[SignalLength.Four]++
          break
        case SignalLength.Seven:
          result[SignalLength.Seven]++
          break
        case SignalLength.Eight:
          result[SignalLength.Eight]++
          break
      }
    }
  }

  const sumForSignals =
    result[SignalLength.One] +
    result[SignalLength.Four] +
    result[SignalLength.Seven] +
    result[SignalLength.Eight]
  return { result: sumForSignals }
}

/**
 * @see https://adventofcode.com/2021/day/8
 */
export const day8_2021 = () => {
  console.log("2021 Day 8 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 8, "example.txt")
  const result1 = calculate(exampleData)
  console.log(
    "How many times do digits 1, 4, 7, or 8 appear (should be 26):",
    result1.result
  )

  console.log("\n2021 Day 8 puzzle 1 example:")
  const data = loadFileRows(2021, 8, "data.txt")
  const result2 = calculate(data)
  console.log("How many times do digits 1, 4, 7, or 8 appear:", result2.result)
}
