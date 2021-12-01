import fs from "fs"
import path from "path"

interface Operation {
  operation: string
  argument: number
  isExecuted: boolean
}

const parseOperations = (file: string): Array<Operation> => {
  const operations: Array<Operation> = file.split("\n").map((line) => {
    const [operation, argument] = line.split(" ")
    return { operation, argument: parseInt(argument), isExecuted: false }
  })
  //console.log(JSON.stringify(operations, undefined, 2))

  return operations
}

const runOperations = (
  operations: Array<Operation>,
  logExecutionOnRun = false,
  logExecutionByLine = false
) => {
  let operationIndex = 0
  let accumulator = 0

  while (!operations[operationIndex].isExecuted) {
    const { operation, argument } = operations[operationIndex]
    operations[operationIndex].isExecuted = true
    const originalOperationIndex = operationIndex

    if (operation === "acc") {
      accumulator += argument
      operationIndex++
    }
    if (operation === "jmp") {
      operationIndex += argument
    }
    if (operation === "nop") {
      operationIndex++
    }

    if (logExecutionOnRun) {
      console.log(
        `Line ${originalOperationIndex}: ${operation} ${argument} (acc ${accumulator})`
      )
    }
  }
  if (logExecutionByLine) {
    const executedTotal = operations.filter((op) => op.isExecuted).length
    console.log(
      `Executed ops: ${executedTotal}, total ops: ${operations.length}`
    )

    operations.forEach(({ operation, argument, isExecuted }, i) => {
      console.log(
        `Line ${i}: ${operation} ${argument} (executed? ${isExecuted})`
      )
    })
  }

  return { operations, accumulator }
}

const modifyOperationsToEndAtFileEnd = (file: string): Array<Operation> => {
  const operations = parseOperations(file)
  const { operations: dryRunOperations } = runOperations(
    operations,
    false,
    false
  )

  let lastJumpBackIndex: number
  for (let index = dryRunOperations.length - 1; index >= 0; index--) {
    const { operation, argument, isExecuted } = dryRunOperations[index]

    if (operation === "jmp" && argument < 0) {
      console.log(`Last jump back: Line ${index}: ${operation} ${argument}`)
      lastJumpBackIndex = index
      break
    }
  }

  let jumpToEndIndex = 0
  dryRunOperations.forEach(({ operation, argument, isExecuted }, index) => {
    if (!isExecuted && operation !== "acc") {
      const nextIndex = index + argument
      if (
        nextIndex > lastJumpBackIndex &&
        nextIndex < dryRunOperations.length
      ) {
        jumpToEndIndex = index
        console.log(
          `Found Line ${index}: ${operation} ${argument} that will jump to end (to ${nextIndex}) if executed`
        )
      }
    }
  })

  for (let index = jumpToEndIndex - 1; index >= 0; index--) {
    const { operation, argument, isExecuted } = dryRunOperations[index]

    if (isExecuted) {
      console.log(
        `Found Line ${index}: ${operation} ${argument} that will be changed to nop`
      )
      dryRunOperations[index].operation = "nop"
      break
    }
  }

  return operations.map((op) => {
    return { ...op, isExecuted: false }
  })
}

const exampleFile = String(
  fs.readFileSync(path.resolve(__dirname, `../../resources/2020/8/example.txt`))
)
const dataFile = String(
  fs.readFileSync(path.resolve(__dirname, `../../resources/2020/8/data.txt`))
)

export const day8 = () => {
  console.log("\nDay 8 puzzle 1 example: (should be 5)")
  console.log(
    `Accumulator: ${runOperations(parseOperations(exampleFile)).accumulator}`
  )

  console.log("\nDay 8 puzzle 1:")
  console.log(
    `Accumulator: ${runOperations(parseOperations(dataFile)).accumulator}`
  )

  console.log("\nDay 8 puzzle 2:")
  console.log(
    `Accumulator: ${
      runOperations(modifyOperationsToEndAtFileEnd(dataFile), false, true)
        .accumulator
    }`
  )
}
