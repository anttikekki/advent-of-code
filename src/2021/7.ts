import { loadFileRows } from "../util"

type FuelConsumption = { position: number; fuelConsumption: number }
enum FuelConsumptionRate {
  Linear,
  Triangular
}

const calculateFuelConsumptionForPositionLinear = (
  horizontalPositions: Array<number>,
  position: number
): FuelConsumption | undefined => {
  let totalFuelConsumption = 0
  for (const horizontalPosition of horizontalPositions) {
    let fuelConsumption = 0
    if (position <= horizontalPosition) {
      fuelConsumption = horizontalPosition - position
    }
    if (position > horizontalPosition) {
      fuelConsumption = position - horizontalPosition
    }
    if (fuelConsumption < 0) {
      // Invalid position, not enough fuel
      return undefined
    }
    totalFuelConsumption += fuelConsumption
  }
  return { position, fuelConsumption: totalFuelConsumption }
}

/**
 * 1 = 1
 * 2 = 1 + 2 = 3
 * 3 = 1 + 2 + 3 = 6
 * 4 = 1 + 2 + 3 + 4 = 10
 * 5 = 1 + 2 + 3 + 4  + 5 = 15
 * 6 = 1 + 2 + 3 + 4  + 5  + 6 = 21
 * 7 = 1 + 2 + 3 + 4  + 5  + 6 + 7 = 28
 *
 * @see https://en.wikipedia.org/wiki/Triangular_number
 */
const triangular = (value: number) => {
  return (value / 2) * (value + 1) * (value / value) || 0
}

const calculateFuelConsumptionForPositionTriangular = (
  horizontalPositions: Array<number>,
  position: number
): FuelConsumption | undefined => {
  let totalFuelConsumption = 0
  for (const fuel of horizontalPositions) {
    let steps = 0
    if (position <= fuel) {
      steps = fuel - position
    }
    if (position > fuel) {
      steps = position - fuel
    }
    // console.log("Position:", position, "fuel:", fuel, "steps:", steps)
    if (steps < 0) {
      // Invalid position, not enough fuel
      return undefined
    }
    const fuelConsumption = triangular(steps)
    /*console.log(
      "Position:",
      position,
      "fuel:",
      fuel,
      "steps:",
      steps,
      "fuelConsumption",
      fuelConsumption
    )*/
    totalFuelConsumption += fuelConsumption
  }
  return { position, fuelConsumption: totalFuelConsumption }
}

const calculateFuelConsumptionForPosition = (
  horizontalPositions: Array<number>,
  position: number,
  rate: FuelConsumptionRate
): FuelConsumption | undefined => {
  if (rate === FuelConsumptionRate.Linear) {
    return calculateFuelConsumptionForPositionLinear(
      horizontalPositions,
      position
    )
  }
  if (rate === FuelConsumptionRate.Triangular) {
    return calculateFuelConsumptionForPositionTriangular(
      horizontalPositions,
      position
    )
  }
}

const calculateFuelConsumption = (
  data: Array<string>,
  rate: FuelConsumptionRate
) => {
  const horizontalPositions = data[0].split(",").map(Number)
  const maxPosition = [...horizontalPositions].sort((a, b) => a - b)[
    horizontalPositions.length - 1
  ]

  const fuelConsumptionByPosition: Array<FuelConsumption> = []
  for (let position = 0; position <= maxPosition; position++) {
    const totalFuelConsumption = calculateFuelConsumptionForPosition(
      horizontalPositions,
      position,
      rate
    )
    if (totalFuelConsumption !== undefined) {
      fuelConsumptionByPosition.push(totalFuelConsumption)
    }
  }

  // console.log(fuelConsumptionByPosition)
  const minFuelConsumption = fuelConsumptionByPosition.sort(
    (a, b) => a.fuelConsumption - b.fuelConsumption
  )[0]
  return minFuelConsumption
}

/**
 * @see https://adventofcode.com/2021/day/7
 */
export const day7_2021 = () => {
  console.log("2021 Day 7 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 7, "example.txt")
  const result1 = calculateFuelConsumption(
    exampleData,
    FuelConsumptionRate.Linear
  )
  console.log("Position (should be 2):", result1.position)
  console.log("Min fuel consumption (should be 37):", result1.fuelConsumption)

  console.log("\n2021 Day 7 puzzle 1:")
  const data = loadFileRows(2021, 7, "data.txt")
  const result2 = calculateFuelConsumption(data, FuelConsumptionRate.Linear)
  console.log("Position:", result2.position)
  console.log("Min fuel consumption:", result2.fuelConsumption)

  console.log("\n2021 Day 7 puzzle 2 example:")
  const result3 = calculateFuelConsumption(
    exampleData,
    FuelConsumptionRate.Triangular
  )
  console.log("Position (should be 5):", result3.position)
  console.log("Min fuel consumption (should be 168):", result3.fuelConsumption)

  console.log("\n2021 Day 7 puzzle 2:")
  const result4 = calculateFuelConsumption(data, FuelConsumptionRate.Triangular)
  console.log("Position:", result4.position)
  console.log("Min fuel consumption:", result4.fuelConsumption)
}
