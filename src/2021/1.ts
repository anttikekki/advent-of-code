import fs from "fs"
import path from "path"

export const day1_2021 = () => {
  const filePath = path.resolve(__dirname, "../../resources/2021/1/data.txt")
  const file = fs.readFileSync(filePath)
  const data = new String(file).split("\n").map(Number)

  console.log("2021 Day 1 puzzle 1:")
}
