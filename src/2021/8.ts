import { loadFileRows } from "../util"

/*
    0:      1:      2:      3:      4:
   aaaa    ....    aaaa    aaaa    ....
  b    c  .    c  .    c  .    c  b    c
  b    c  .    c  .    c  .    c  b    c
   ....    ....    dddd    dddd    dddd
  e    f  .    f  e    .  .    f  .    f
  e    f  .    f  e    .  .    f  .    f
   gggg    ....    gggg    gggg    ....

    5:      6:      7:      8:      9:
   aaaa    aaaa    aaaa    aaaa    aaaa
  b    .  b    .  .    c  b    c  b    c
  b    .  b    .  .    c  b    c  b    c
   dddd    dddd    ....    dddd    dddd
  .    f  e    f  .    f  e    f  .    f
  .    f  e    f  .    f  e    f  .    f
   gggg    gggg    ....    gggg    gggg
*/
enum SignalLength {
  ZeroSixNine = 6,
  One = 2,
  TwoThreeFive = 5,
  Four = 4,
  Seven = 3,
  Eight = 7
}

const calculateOneFourSevenAndEightSignalSum = (data: Array<string>) => {
  const result: Array<number> = []
  result[SignalLength.One] = 0
  result[SignalLength.Four] = 0
  result[SignalLength.Seven] = 0
  result[SignalLength.Eight] = 0

  for (const row of data) {
    const [, fourDigitOutput] = row.split(" | ")
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

/*
    0:      1:      2:      3:      4:
   aaaa    ....    aaaa    aaaa    ....
  b    c  .    c  .    c  .    c  b    c
  b    c  .    c  .    c  .    c  b    c
   ....    ....    dddd    dddd    dddd
  e    f  .    f  e    .  .    f  .    f
  e    f  .    f  e    .  .    f  .    f
   gggg    ....    gggg    gggg    ....

    5:      6:      7:      8:      9:
   aaaa    aaaa    aaaa    aaaa    aaaa
  b    .  b    .  .    c  b    c  b    c
  b    .  b    .  .    c  b    c  b    c
   dddd    dddd    ....    dddd    dddd
  .    f  e    f  .    f  e    f  .    f
  .    f  e    f  .    f  e    f  .    f
   gggg    gggg    ....    gggg    gggg

  Example row 1:
  acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
  cdfeb fcadb cdfeb cdbaf

  ab: 1
  eafb: 4
  dab: 7
  acedgfb: 8

   dddd
  e    a
  e    a
   ffff
  g    b
  g    b
   cccc

  cagedb: 0
  ab: 1
  gcdfa: 2
  fbcad: 3
  eafb: 4
  cdfbe: 5
  cdfgeb: 6
  dab: 7
  acedgfb: 8
  cefabd: 9

*/

const calculateAllSignalSum = (data: Array<string>) => {
  let sum = 0
  for (const row of data) {
    const [tenUniqueSignalPattenrs, fourOutputDigitsPatterns] = row.split(" | ")
    const signalPatterns = tenUniqueSignalPattenrs
      .split(" ")
      .map((p) => p.split(""))
    const outputDigitsPatterns = fourOutputDigitsPatterns
      .split(" ")
      .map((p) => p.split(""))

    const one = searchPatternByLength(signalPatterns, SignalLength.One)[0]
    const four = searchPatternByLength(signalPatterns, SignalLength.Four)[0]
    const seven = searchPatternByLength(signalPatterns, SignalLength.Seven)[0]
    const eight = searchPatternByLength(signalPatterns, SignalLength.Eight)[0]

    // Number seven contains all chars from number one, the extra char is top char
    const topChar = seven.filter((c) => !one.includes(c))[0]
    console.assert(!!topChar, "Top char is not found")

    // Number nine contains all chars from number four + top char
    const nine = searchPatternByLength(
      signalPatterns,
      SignalLength.ZeroSixNine
    ).filter((p) => four.every((c) => p.includes(c)) && p.includes(topChar))[0]
    console.assert(!!nine, "Number 9 is not found")

    // Number nine contains all chars from number four and top char, the extra char is the bottom char
    const bottomChar = nine.filter((c) => !four.includes(c) && c !== topChar)[0]
    console.assert(!!bottomChar, "Bottom char is not found")

    // Number three contains all chars from number one but two or five does not
    const three = searchPatternByLength(
      signalPatterns,
      SignalLength.TwoThreeFive
    ).filter((p) => one.every((c) => p.includes(c)))[0]
    console.assert(!!three, "Number 3 is not found")

    // Number three contains all chars from number one + top char + bottom char, the extra char is middle char
    const middleChar = three.filter(
      (c) => !one.includes(c) && c !== topChar && c !== bottomChar
    )[0]
    console.assert(!!middleChar, "Middle char is not found")

    // Number four constains all chars from number one + middle char, the extra char is top left char
    const topLeftChar = four.filter(
      (c) => !one.includes(c) && c !== middleChar
    )[0]
    console.assert(!!topLeftChar, "Top left char is not found")

    // Number six contains only one char from number one but zero and nine contain both
    const six = searchPatternByLength(
      signalPatterns,
      SignalLength.ZeroSixNine
    ).filter((p) => p.filter((c) => one.includes(c)).length === 1)[0]
    console.assert(!!six, "Number 6 is not found")

    // Number six contains only one char from number one, the extra char is top right
    const topRightChar = one.filter((c) => !six.includes(c))[0]
    console.assert(!!topRightChar, "Top right char is not found")

    // Number one contains only one char other than top right
    const bottomRightChar = one.filter((c) => c !== topRightChar)[0]
    console.assert(!!bottomRightChar, "Bottom right char is not found")

    // Number eight contains all chars from number eight but bottom left
    const bottomLeftChar = eight.filter((c) => !nine.includes(c))[0]
    console.assert(!!bottomLeftChar, "Bottom left char is not found")

    const zero = searchPatternByLength(
      signalPatterns,
      SignalLength.ZeroSixNine
    ).filter((p) => p !== nine && p !== six)[0]
    console.assert(!!zero, "Number 0 is not found")

    const five = searchPatternByLength(
      signalPatterns,
      SignalLength.TwoThreeFive
    ).filter((p) => p.includes(topLeftChar))[0]
    console.assert(!!five, "Number 2 is not found")

    const two = searchPatternByLength(
      signalPatterns,
      SignalLength.TwoThreeFive
    ).filter((p) => p !== three && p !== five)[0]
    console.assert(!!two, "Number 2 is not found")

    const patterns = [
      zero,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine
    ]
    console.log("")
    console.log(tenUniqueSignalPattenrs)
    console.log(patterns.map((p, i) => `${i}: ${p.join("")}`))

    let fourNumberDigit = ""
    for (const outputDigitPattern of outputDigitsPatterns) {
      fourNumberDigit += patterns
        .findIndex(
          (p) =>
            p.length === outputDigitPattern.length &&
            p.every((c) => outputDigitPattern.includes(c))
        )
        .toString()
    }
    console.log(fourOutputDigitsPatterns, fourNumberDigit)
    sum += parseInt(fourNumberDigit)
  }

  return { result: sum }
}

const searchPatternByLength = (
  patterns: string[][],
  length: number
): string[][] => {
  return patterns.filter((p) => p.length === length)
}

/**
 * @see https://adventofcode.com/2021/day/8
 */
export const day8_2021 = () => {
  console.log("2021 Day 8 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 8, "example.txt")
  const result1 = calculateOneFourSevenAndEightSignalSum(exampleData)
  console.log(
    "How many times do digits 1, 4, 7, or 8 appear (should be 26):",
    result1.result
  )

  console.log("\n2021 Day 8 puzzle 1 example:")
  const data = loadFileRows(2021, 8, "data.txt")
  const result2 = calculateOneFourSevenAndEightSignalSum(data)
  console.log("How many times do digits 1, 4, 7, or 8 appear:", result2.result)

  console.log("\n2021 Day 8 puzzle 2 example:")
  const result3 = calculateAllSignalSum(exampleData)
  console.log("Sum (should be 61229):", result3.result)

  console.log("\n2021 Day 8 puzzle 2:")
  const result4 = calculateAllSignalSum(data)
  console.log("Sum:", result4.result)
}
