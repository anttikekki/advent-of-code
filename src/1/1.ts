import fs from "fs"
import path from "path"

const filePath = path.resolve(__dirname, "../../resources/1/data.txt")
const file = fs.readFileSync(filePath)
const data = new String(file).split("\n").map(Number)

data.forEach((value1, i1) => {
  data.forEach((value2, i2) => {
    if (value1 + value2 === 2020) {
      console.log(`${value1} + ${value2} = 2020`)
      console.log(`${value1} * ${value2} = ${value1 * value2}`)
    }
  })
})
