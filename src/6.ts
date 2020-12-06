import fs from "fs"
import path from "path"

const sumAnswers = (file: string, sumOnlyQuestionsThatAllAnswered: boolean) => {
  const groups = file
    .split("\n\n")
    .map((group) => group.split("\n"))
    .map((groupAnswerLines) =>
      groupAnswerLines.map((answerLine) => answerLine.split(""))
    )

  const questionsAnsweredByGroup = groups.map((group) => {
    const answers = new Set<string>()
    group.forEach((answerLine) => {
      answerLine.forEach((question) => answers.add(question))
    })

    if (sumOnlyQuestionsThatAllAnswered) {
      return Array.from(answers).filter((question) => {
        return group.every((answerLine) => {
          return answerLine.includes(question)
        })
      }).length
    }

    return answers.size
  })

  return questionsAnsweredByGroup.reduce((prev, current) => prev + current, 0)
}

const exampleFile = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/6/example.txt`))
)
const dataFile = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/6/data.txt`))
)

export const day6 = () => {
  console.log("\nDay 6 puzzle 1 example: (sum should be 11)")
  console.log(`Sum: ${sumAnswers(exampleFile, false)}`)

  console.log("\nDay 6 puzzle 1:")
  console.log(`Sum: ${sumAnswers(dataFile, false)}`)

  console.log("\nDay 6 puzzle 2 example: (sum should be 6)")
  console.log(`Sum: ${sumAnswers(exampleFile, true)}`)

  console.log("\nDay 6 puzzle 2:")
  console.log(`Sum: ${sumAnswers(dataFile, true)}`)
}
