import { loadFileRows } from "../util"

type FuelConsumption = { position: number; fuelConsumption: number }

const calculateFuelConsumptionForPosition = (
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

const calculateFuelConsumption = (data: Array<string>) => {
  const horizontalPositions = data[0].split(",").map(Number)
  const maxPosition = [...horizontalPositions].sort((a, b) => a - b)[
    horizontalPositions.length - 1
  ]

  const fuelConsumptionByPosition: Array<FuelConsumption> = []
  for (let position = 0; position <= maxPosition; position++) {
    const totalFuelConsumption = calculateFuelConsumptionForPosition(
      horizontalPositions,
      position
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
  const result1 = calculateFuelConsumption(exampleData)
  console.log("Position (should be 2):", result1.position)
  console.log("Min fuel consumption (should be 37):", result1.fuelConsumption)

  console.log("\n2021 Day 7 puzzle 1:")
  const data = loadFileRows(2021, 7, "data.txt")
  const result2 = calculateFuelConsumption(data)
  console.log("Position:", result2.position)
  console.log("Min fuel consumption:", result2.fuelConsumption)
}
