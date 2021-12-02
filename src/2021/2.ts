import { loadFileRows } from "../util"

const calculate = (commands: Array<string>) => {
  let horizontalPosition = 0
  let depth = 0

  for (const command of commands) {
    if (command.startsWith("forward")) {
      const forward = command.split(" ")[1]
      horizontalPosition += parseInt(forward)
    }
    if (command.startsWith("down")) {
      const down = command.split(" ")[1]
      depth += parseInt(down)
    }
    if (command.startsWith("up")) {
      const up = command.split(" ")[1]
      depth -= parseInt(up)
    }
  }
  const result = horizontalPosition * depth

  return {
    horizontalPosition,
    depth,
    result
  }
}

export const day2_2021 = () => {
  console.log("2021 Day 2 puzzle 1 example:")
  const exampleData = loadFileRows(2021, 2, "example.txt")

  /*
  forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2
  */
  const result = calculate(exampleData)
  console.log("Horizontal position (should be 15):", result.horizontalPosition)
  console.log("Depth (should be 10):", result.depth)
  console.log("Result (should be 150):", result.result)

  console.log("\n2021 Day 2 puzzle 1:")
  const data = loadFileRows(2021, 2, "data.txt")
  const result2 = calculate(data)
  console.log("Horizontal position (should be ??):", result2.horizontalPosition)
  console.log("Depth (should be ??):", result2.depth)
  console.log("Result (should be ??):", result2.result)
}
