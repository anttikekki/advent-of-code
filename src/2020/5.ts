import fs from "fs"
import path from "path"

const splitAndSelect = (
  code: string,
  span: [number, number]
): [number, number] => {
  const [min, max] = span
  const middle = (min + max) / 2

  if (code === "F" || code === "L") {
    return [min, Math.floor(middle)]
  }
  if (code === "B" || code === "R") {
    return [Math.ceil(middle), max]
  }
  throw Error(`Unknown row or seat code ${code}`)
}

const getSeatId = (seatCode: string): number => {
  const rowCodes = seatCode.substr(0, 7).split("")

  let rowSpan: [number, number] = [0, 127]
  rowCodes.forEach((code) => {
    /*console.log(
      `Splitting rows from ${rowSpan[0]} to ${rowSpan[1]} with code ${code}`
    )*/
    rowSpan = splitAndSelect(code, rowSpan)
    //console.log(`Result: keeps rows from ${rowSpan[0]} to ${rowSpan[1]}`)
  })

  const seatCodes = seatCode.substr(7, 3).split("")

  let seatSpan: [number, number] = [0, 7]
  seatCodes.forEach((code) => {
    /*console.log(
      `Splitting seats from ${seatSpan[0]} to ${seatSpan[1]} with code ${code}`
    )*/
    seatSpan = splitAndSelect(code, seatSpan)
    //console.log(`Result: keeps seats from ${seatSpan[0]} to ${seatSpan[1]}`)
  })

  const result = { row: rowSpan[0], seat: seatSpan[0] }
  //console.log(`Result: row ${result.row}, column ${result.seat}`)

  return result.row * 8 + result.seat
}

const getMaxSeatId = (file: string): number => {
  const seatIds = file.split("\n").map(getSeatId)
  //console.log(`Seat IDs: ${seatIds}`)
  return Math.max(...seatIds)
}

const exampleFile = String(
  fs.readFileSync(path.resolve(__dirname, `../../resources/2020/5/example.txt`))
)
const dataFile = String(
  fs.readFileSync(path.resolve(__dirname, `../../resources/2020/5/data.txt`))
)

export const day5 = () => {
  console.log("\nDay 5 puzzle 1 example 1 FBFBBFFRLR: (seat ID should be 357)")
  console.log(`Seat ID: ${getSeatId("FBFBBFFRLR")}`)

  console.log("\nDay 5 puzzle 1 example 2 BFFFBBFRRR: (seat ID should be 567)")
  console.log(`Seat ID: ${getSeatId("BFFFBBFRRR")}`)

  console.log("\nDay 5 puzzle 1 example 3 FFFBBBFRRR: (seat ID should be 119)")
  console.log(`Seat ID: ${getSeatId("FFFBBBFRRR")}`)

  console.log("\nDay 5 puzzle 1 example 4 BBFFBBFRLL: (seat ID should be 820)")
  console.log(`Seat ID: ${getSeatId("BBFFBBFRLL")}`)

  console.log("\nDay 5 puzzle 1 example max seat id: (should be 820)")
  console.log(`Max seat ID: ${getMaxSeatId(exampleFile)}`)

  console.log("\nDay 5 puzzle 1 max seat id:")
  console.log(`Max seat ID: ${getMaxSeatId(dataFile)}`)

  console.log("\nDay 5 puzzle 2:")
  const seatIds = dataFile.split("\n").map(getSeatId)
  seatIds.sort((a, b) => a - b)
  for (let i = 0; i < seatIds.length; i++) {
    if (i + 1 >= seatIds.length) {
      continue
    }
    const currentId = seatIds[i]
    const nextId = seatIds[i + 1]

    if (currentId + 1 !== nextId) {
      console.log(`Seat id ${currentId + 1} is missing from list`)
    }
  }
}
