import fs from "fs"
import path from "path"

export const day2 = () => {
  const filePath = path.resolve(__dirname, "../../resources/2020/2/data.txt")
  const file = fs.readFileSync(filePath)

  console.log("Day 2 puzzle 1:")

  const data = new String(file).split("\n").map((line) => {
    //Line:  "1-3 a: abcde"
    const tokens = line.split(" ")
    const amount = tokens[0].split("-")
    return {
      line,
      minCount: parseInt(amount[0]),
      maxCount: parseInt(amount[1]),
      letter: tokens[1].replace(":", ""),
      password: tokens[2]
    }
  })

  let correctCount = 0
  data.forEach(({ line, minCount, maxCount, password, letter }) => {
    const passwordLetters = password.split("")
    const matchCount = passwordLetters.filter((l) => l === letter).length

    if (matchCount >= minCount && matchCount <= maxCount) {
      correctCount++
      console.log(`Match: ${line}`)
      console.log(`\n`)
    }
  })
  console.log(`Found ${correctCount} correct passwords`)

  console.log(`\n`)
  console.log("Day 2 puzzle 2:")

  correctCount = 0
  data.forEach(({ line, minCount, maxCount, password, letter }) => {
    const passwordLetters = password.split("")
    const firstMatch = passwordLetters[minCount - 1] === letter
    const secondMatch = passwordLetters[maxCount - 1] === letter

    if (firstMatch !== secondMatch) {
      correctCount++
      console.log(`Match: ${line}`)
      console.log(`\n`)
    }
  })
  console.log(`Found ${correctCount} correct passwords`)
}
