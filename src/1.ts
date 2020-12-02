import fs from "fs"
import path from "path"

export const day1 = () => {
  const filePath = path.resolve(__dirname, "../resources/1/data.txt")
  const file = fs.readFileSync(filePath)
  const data = new String(file).split("\n").map(Number)

  console.log("Day 1 puzzle 1:")
  data.forEach((value1) => {
    data.forEach((value2) => {
      if (value1 + value2 === 2020) {
        console.log(`${value1} + ${value2} = 2020`)
        console.log(`${value1} * ${value2} = ${value1 * value2}`)
      }
    })
  })

  console.log("\n")
  console.log("Day 1 puzzle 2:")
  data.forEach((value1) => {
    data.forEach((value2) => {
      data.forEach((value3) => {
        if (value1 + value2 + value3 === 2020) {
          console.log(`${value1} + ${value2} + ${value3} = 2020`)
          console.log(
            `${value1} * ${value2} * ${value3} = ${value1 * value2 * value3}`
          )
        }
      })
    })
  })
}
