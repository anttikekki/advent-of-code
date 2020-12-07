import fs from "fs"
import path from "path"

interface IncludedColor {
  count: number
  color: string
}

interface Rule {
  color: string
  includedColors: Array<IncludedColor>
}

const parseRules = (file: string): Array<Rule> => {
  // light red bags contain 1 bright white bag, 2 muted yellow bags
  const rules = file.split("\n").map((line) => {
    const [bagColor, includedBagColorsLine] = line.split(" bags contain ")
    const includedBagColors = includedBagColorsLine
      .split(", ")
      .filter((v) => v !== "no other bags.")
      .map(
        (includedBagColorToken): IncludedColor => {
          // 1 bright white bag
          const tokens = includedBagColorToken.split(" ")
          const bagCount = parseInt(tokens[0]) // 1
          const bagColor = `${tokens[1]} ${tokens[2]}` // bright white
          return { count: bagCount, color: bagColor }
        }
      )
    return { color: bagColor, includedColors: includedBagColors }
  })

  // console.log(JSON.stringify(rules, undefined, 2))
  return rules
}

const getRuleForColor = (rules: Array<Rule>, color: string): Rule | undefined =>
  rules.find((rule) => rule.color === color)

const findColor = (rules: Array<Rule>, rule: Rule, color: string): boolean => {
  return rule.includedColors.some((includedColor) => {
    if (includedColor.color === color) {
      return true
    }
    const rule = getRuleForColor(rules, includedColor.color)
    if (rule) {
      return findColor(rules, rule, color)
    }
    return false
  })
}

const countBagColors = (file: string, color: string): number => {
  const rules = parseRules(file)

  const matchingRules = rules.filter((rule) => findColor(rules, rule, color))

  return matchingRules.length
}

const exampleFile = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/7/example.txt`))
)
const dataFile = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/7/data.txt`))
)

export const day7 = () => {
  console.log("\nDay 7 puzzle 1 example: (number of bag colors should be 4)")
  console.log(
    `Number of bag colors: ${countBagColors(exampleFile, "shiny gold")}`
  )

  console.log("\nDay 7 puzzle 1:")
  console.log(`Number of bag colors: ${countBagColors(dataFile, "shiny gold")}`)
}
