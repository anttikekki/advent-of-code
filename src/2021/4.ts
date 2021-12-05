import { loadFileRows } from "../util"

type Cell = { value: number; match: boolean }
type Table = {
  table: Array<Array<Cell>>
  won: boolean
  wonAtRound: number
  wonAtNumber: number
}

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
        currentTable = {
          table: [],
          won: false,
          wonAtNumber: NaN,
          wonAtRound: NaN
        }
        tables.push(currentTable)
      }
      const tableRow = row
        .split(" ")
        .filter((v) => !!v.trim())
        .map(Number)
        .map((v) => {
          return { value: v, match: false }
        })
      currentTable.table.push(tableRow)
    }
  }

  // Validate
  for (const table of tables) {
    console.assert(table.table.length === 5, "Every table should have 5 rows")
    for (const row of table.table) {
      console.assert(row.length === 5, "Every table row should have 5 columns")
    }
  }

  return { numbers, tables }
}

const executeBingo = (tables: Array<Table>, numbers: Array<number>) => {
  let round = 1
  for (const number of numbers) {
    // Mark matches
    for (const table of tables) {
      if (table.won) {
        continue
      }
      for (const row of table.table) {
        for (const rowNumber of row) {
          if (rowNumber.value === number) {
            rowNumber.match = true
          }
        }
      }
    }

    for (const table of tables) {
      if (table.won) {
        continue
      }

      // Check horizontal lines
      for (const row of table.table) {
        if (row.every((v) => v.match)) {
          table.won = true
          table.wonAtNumber = number
          table.wonAtRound = round
        }
      }

      // Check vertical lines
      for (let i = 0; i < 5; i++) {
        if (table.table.map((row) => row[i]).every((v) => v.match)) {
          table.won = true
          table.wonAtNumber = number
          table.wonAtRound = round
        }
      }
    }
    round++
  }
}

const printTable = (table: Table) => {
  console.log("\n")
  console.log("Won:", table.won)
  console.log("Won at round:", table.wonAtRound)
  console.log("Won at number:", table.wonAtNumber)

  const formatCell = (cell: Cell) => {
    const value =
      cell.value.toString().length === 1
        ? ` ${cell.value}`
        : cell.value.toString()
    return cell.match ? `*${value}*` : ` ${value} `
  }
  for (const row of table.table) {
    console.log(row.map(formatCell).join(" "))
  }
}

const printGameState = (tables: Array<Table>, number: number) => {
  console.log("Number:", number)
  for (const table of tables) {
    printTable(table)
  }
}

const calculatePoints = (table: Table) => {
  let unmatchedSum = 0
  for (const row of table.table) {
    for (const rowNumber of row) {
      if (!rowNumber.match) {
        unmatchedSum += rowNumber.value
      }
    }
  }
  const result = unmatchedSum * table.wonAtNumber!
  //printGameState(tables, winner.number)
  return { result, lastNumber: table.wonAtNumber, unmatchedSum }
}

const findFirstWinner = (tables: Array<Table>) => {
  const sorted = [...tables]
    .filter((t) => t.won)
    .sort((a, b) => a.wonAtRound - b.wonAtRound)
  return sorted[0]
}

const findLastWinner = (tables: Array<Table>) => {
  const sorted = [...tables]
    .filter((t) => t.won)
    .sort((a, b) => a.wonAtRound - b.wonAtRound)
  return sorted[sorted.length - 1]
}

const executeBingoAndFindFirstWinner = (data: Array<string>) => {
  const { numbers, tables } = parseTables(data)
  executeBingo(tables, numbers)
  const winner = findFirstWinner(tables)
  return calculatePoints(winner)
}

const executeBingoAndFindLastWinner = (data: Array<string>) => {
  const { numbers, tables } = parseTables(data)
  executeBingo(tables, numbers)
  const winner = findLastWinner(tables)
  return calculatePoints(winner)
}

/**
 * @see https://adventofcode.com/2021/day/4
 */
export const day4_2021 = () => {
  console.log("2021 Day 4 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 4, "example.txt")
  const result1 = executeBingoAndFindFirstWinner(exampleData)
  console.log("Last number (should be 24):", result1.lastNumber)
  console.log("Unmatched sum (should be 188):", result1.unmatchedSum)
  console.log("Result (should be 4512):", result1.result)

  console.log("\n2021 Day 4 puzzle 1:")
  const data = loadFileRows(2021, 4, "data.txt")
  const result2 = executeBingoAndFindFirstWinner(data)
  console.log("Last number:", result2.lastNumber)
  console.log("Unmatched sum:", result2.unmatchedSum)
  console.log("Result:", result2.result)

  console.log("\n2021 Day 4 puzzle 2 example:")
  const result3 = executeBingoAndFindLastWinner(exampleData)
  console.log("Last number (should be 13):", result3.lastNumber)
  console.log("Unmatched sum (should be 148):", result3.unmatchedSum)
  console.log("Result (should be 1924):", result3.result)

  console.log("\n2021 Day 4 puzzle 2:")
  const result4 = executeBingoAndFindLastWinner(data)
  console.log("Last number:", result4.lastNumber)
  console.log("Unmatched sum:", result4.unmatchedSum)
  console.log("Result:", result4.result)
}
