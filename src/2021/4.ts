import { loadFileRows } from "../util"

type Cell = { value: number; match: boolean }
type Table = Array<Array<Cell>>

const parseTables = (data: Array<string>) => {
  const numbers = data[0].split(",").map(Number)
  const tables: Array<Table> = []
  let currentTable: Table | undefined = undefined

  for (const row of data.slice(2)) {
    if (row === "") {
      if (currentTable) {
        currentTable = undefined
      }
    } else {
      if (!currentTable) {
        currentTable = []
        tables.push(currentTable)
      }
      const tableRow = row
        .split(" ")
        .filter((v) => !!v.trim())
        .map(Number)
        .map((v) => {
          return { value: v, match: false }
        })
      currentTable.push(tableRow)
    }
  }

  // Validate
  for (const table of tables) {
    console.assert(table.length === 5, "Every table should have 5 rows")
    for (const row of table) {
      console.assert(row.length === 5, "Every table row should have 5 columns")
    }
  }

  return { numbers, tables }
}

const executeBingo = (
  tables: Array<Table>,
  numbers: Array<number>
): { table: Table; number: number } | undefined => {
  for (const number of numbers) {
    // Mark matches
    for (const table of tables) {
      for (const row of table) {
        for (const rowNumber of row) {
          if (rowNumber.value === number) {
            rowNumber.match = true
          }
        }
      }
    }

    for (const table of tables) {
      // Check horizontal lines
      for (const row of table) {
        if (row.every((v) => v.match)) {
          return { table, number }
        }
      }

      // Check vertical lines
      for (let i = 0; i < 5; i++) {
        if (table.map((row) => row[i]).every((v) => v.match)) {
          return { table, number }
        }
      }
    }
  }
  return undefined
}

const printTable = (table: Table) => {
  console.log("\n")
  const formatCell = (cell: Cell) => {
    const value =
      cell.value.toString().length === 1
        ? ` ${cell.value}`
        : cell.value.toString()
    return cell.match ? `*${value}*` : ` ${value} `
  }
  for (const row of table) {
    console.log(row.map(formatCell).join(" "))
  }
}

const printGameState = (tables: Array<Table>, number: number) => {
  console.log("Number:", number)
  for (const table of tables) {
    printTable(table)
  }
}

const calculate = (data: Array<string>) => {
  const { numbers, tables } = parseTables(data)

  const winner = executeBingo(tables, numbers)
  if (winner) {
    let unmatchedSum = 0
    for (const row of winner.table) {
      for (const rowNumber of row) {
        if (!rowNumber.match) {
          unmatchedSum += rowNumber.value
        }
      }
    }
    const result = unmatchedSum * winner.number
    //printGameState(tables, winner.number)
    return { result, lastNumber: winner.number, unmatchedSum }
  }
  return undefined
}

/**
 * @see https://adventofcode.com/2021/day/4
 */
export const day4_2021 = () => {
  console.log("2021 Day 4 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 4, "example.txt")
  const result1 = calculate(exampleData)
  console.log("Last number (should be 24):", result1?.lastNumber)
  console.log("Unmatched sum (should be 188):", result1?.unmatchedSum)
  console.log("Result (should be 4512):", result1?.result)

  console.log("\n2021 Day 4 puzzle 1:")
  const data = loadFileRows(2021, 4, "data.txt")
  const result2 = calculate(data)
  console.log("Last number:", result2?.lastNumber)
  console.log("Unmatched sum:", result2?.unmatchedSum)
  console.log("Result:", result2?.result)
}
