import fs from "fs"
import path from "path"

export const day2 = () => {
  const filePath = path.resolve(__dirname, "../resources/1/data.txt")
  const file = fs.readFileSync(filePath)
  const data = new String(file).split("\n").map(Number)

  console.log("Day 2 puzzle 1:")
}
