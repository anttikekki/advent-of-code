import fs from "fs"
import path from "path"

export const day2 = () => {
  const filePath = path.resolve(__dirname, "../resources/2/data.txt")
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
      console.log(`\n`)
      console.log(`Match: ${line}`)
      console.log(`${password} contains ${letter} ${matchCount} times`)
    }
  })
  console.log(`Found ${correctCount} correct password`)
}
