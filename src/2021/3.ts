import { loadFileRows } from "../util"

const calculate = (data: Array<string>) => {
  const mostCommonBits: Array<{ "1": number; "0": number }> = []
  for (const row of data) {
    const bits = row.split("")
    let bitIndex = 0
    for (const bit of bits) {
      if (!mostCommonBits[bitIndex]) {
        mostCommonBits[bitIndex] = { "1": 0, "0": 0 }
      }
      if (bit === "0" || bit === "1") {
        mostCommonBits[bitIndex][bit]++
      }
      bitIndex++
    }
  }
  const gammaRateBinary = mostCommonBits
    .map((b) => (b["1"] > b["0"] ? "1" : "0"))
    .join("")
  const epsilonRateBinary = mostCommonBits
    .map((b) => (b["1"] > b["0"] ? "0" : "1"))
    .join("")

  let gammaRate = parseInt(gammaRateBinary, 2)
  let epsilonRate = parseInt(epsilonRateBinary, 2)
  const powerConsumption = gammaRate * epsilonRate
  return {
    gammaRateBinary,
    epsilonRateBinary,
    gammaRate,
    epsilonRate,
    powerConsumption
  }
}

/**
 * @see https://adventofcode.com/2021/day/3
 */
export const day3_2021 = () => {
  console.log("2021 Day 1 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 3, "example.txt")

  /*
  00100
  11110
  10110
  10111
  10101
  01111
  00111
  11100
  10000
  11001
  00010
  01010
  */
  const result1 = calculate(exampleData)
  console.log("Gamma rate binary (should be 10110):", result1.gammaRateBinary)
  console.log(
    "epsilon rate binary (should be 01001):",
    result1.epsilonRateBinary
  )
  console.log("Gamma rate (should be 22):", result1.gammaRate)
  console.log("Epsilon rate (should be 9):", result1.epsilonRate)
  console.log("Power consumption (should be 198):", result1.powerConsumption)

  console.log("\n2021 Day 1 puzzle 1:")
  const data = loadFileRows(2021, 3, "data.txt")
  const result2 = calculate(data)
  console.log("Gamma rate binary:", result2.gammaRateBinary)
  console.log("epsilon rate binary:", result2.epsilonRateBinary)
  console.log("Gamma rate:", result2.gammaRate)
  console.log("Epsilon rate:", result2.epsilonRate)
  console.log("Power consumption:", result2.powerConsumption)
}
