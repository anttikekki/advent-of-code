import { loadFileRows } from "../util"

const calculatePowerConsumption = (data: Array<string>) => {
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

  const gammaRate = parseInt(gammaRateBinary, 2)
  const epsilonRate = parseInt(epsilonRateBinary, 2)
  const powerConsumption = gammaRate * epsilonRate
  return {
    gammaRateBinary,
    epsilonRateBinary,
    gammaRate,
    epsilonRate,
    powerConsumption
  }
}

enum BitCriteria {
  MostCommon,
  LeastCommon
}

const findRowByBitCriteria = (data: Array<string>, criteria: BitCriteria) => {
  let bitIndex = 0
  let remainingRows = data
  while (remainingRows.length > 1) {
    const ones = []
    const zeros = []
    for (const row of remainingRows) {
      const bits = row.split("")
      const bit = bits[bitIndex]
      if (bit === "0") {
        zeros.push(row)
      }
      if (bit === "1") {
        ones.push(row)
      }
    }

    if (ones.length > zeros.length) {
      if (criteria === BitCriteria.MostCommon) {
        remainingRows = ones
      }
      if (criteria === BitCriteria.LeastCommon) {
        remainingRows = zeros
      }
    }
    if (ones.length < zeros.length) {
      if (criteria === BitCriteria.MostCommon) {
        remainingRows = zeros
      }
      if (criteria === BitCriteria.LeastCommon) {
        remainingRows = ones
      }
    }
    if (ones.length === zeros.length) {
      if (criteria === BitCriteria.MostCommon) {
        remainingRows = ones
      }
      if (criteria === BitCriteria.LeastCommon) {
        remainingRows = zeros
      }
    }

    bitIndex++
  }

  return remainingRows[0]
}

const calculateLifeSupportRating = (data: Array<string>) => {
  const oxygenGeneratorRatingBinary = findRowByBitCriteria(
    data,
    BitCriteria.MostCommon
  )
  const CO2ScrubberRatingBinary = findRowByBitCriteria(
    data,
    BitCriteria.LeastCommon
  )
  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2)
  const CO2ScrubberRating = parseInt(CO2ScrubberRatingBinary, 2)
  const lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating

  return {
    oxygenGeneratorRatingBinary,
    CO2ScrubberRatingBinary,
    oxygenGeneratorRating,
    CO2ScrubberRating,
    lifeSupportRating
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
  const result1 = calculatePowerConsumption(exampleData)
  console.log("Gamma rate binary (should be 10110):", result1.gammaRateBinary)
  console.log(
    "Epsilon rate binary (should be 01001):",
    result1.epsilonRateBinary
  )
  console.log("Gamma rate (should be 22):", result1.gammaRate)
  console.log("Epsilon rate (should be 9):", result1.epsilonRate)
  console.log("Power consumption (should be 198):", result1.powerConsumption)

  console.log("\n2021 Day 1 puzzle 1:")
  const data = loadFileRows(2021, 3, "data.txt")
  const result2 = calculatePowerConsumption(data)
  console.log("Gamma rate binary:", result2.gammaRateBinary)
  console.log("Epsilon rate binary:", result2.epsilonRateBinary)
  console.log("Gamma rate:", result2.gammaRate)
  console.log("Epsilon rate:", result2.epsilonRate)
  console.log("Power consumption:", result2.powerConsumption)

  console.log("\n2021 Day 1 puzzle 2 example:")
  const result3 = calculateLifeSupportRating(exampleData)
  console.log(
    "Oxygen generator rating binary (should be 10111):",
    result3.oxygenGeneratorRatingBinary
  )
  console.log(
    "CO2 scrubber rating binary (should be 01010):",
    result3.CO2ScrubberRatingBinary
  )
  console.log(
    "Oxygen generator rating (should be 23):",
    result3.oxygenGeneratorRating
  )
  console.log("CO2 scrubber rating (should be 10):", result3.CO2ScrubberRating)
  console.log("Life support rating (should be 230):", result3.lifeSupportRating)

  console.log("\n2021 Day 1 puzzle 2:")
  const result4 = calculateLifeSupportRating(data)
  console.log(
    "Oxygen generator rating binary:",
    result4.oxygenGeneratorRatingBinary
  )
  console.log("CO2 scrubber rating binary:", result4.CO2ScrubberRatingBinary)
  console.log("Oxygen generator rating:", result4.oxygenGeneratorRating)
  console.log("CO2 scrubber rating:", result4.CO2ScrubberRating)
  console.log("Life support rating:", result4.lifeSupportRating)
}
