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
      .map((includedBagColorToken): IncludedColor => {
        // 1 bright white bag
        const tokens = includedBagColorToken.split(" ")
        const bagCount = parseInt(tokens[0]) // 1
        const bagColor = `${tokens[1]} ${tokens[2]}` // bright white
        return { count: bagCount, color: bagColor }
      })
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
    throw Error(`Unknown color ${color}`)
  })
}

const countBagColors = (file: string, color: string): number => {
  const rules = parseRules(file)
  const matchingRules = rules.filter((rule) => findColor(rules, rule, color))
  return matchingRules.length
}

const countBagsForRule = (rules: Array<Rule>, rule: Rule): number => {
  const subBagsCount = rule.includedColors.length
  if (subBagsCount === 0) {
    console.log(`1 bags for color ${rule.color}`)
    return 1
  }
  const subBags = rule.includedColors.map(({ count, color }) => {
    const nextRule = getRuleForColor(rules, color)
    if (nextRule) {
      const countResult = countBagsForRule(rules, nextRule)
      const result = countResult * count
      console.log(
        `${countResult} (from ${nextRule.color}) * ${count} = ${result} bags of color ${color}`
      )
      return result
    }
    throw Error(`Unknown color ${color}`)
  })
  const subBagSum = subBags.reduce((prev, current) => prev + current, 0)

  console.log(
    `${subBags.join(" + ")} = ${subBagSum} bags for color ${rule.color}`
  )
  return subBagSum
}

const countBags = (file: string): number => {
  const rules = parseRules(file)
  const rule = getRuleForColor(rules, "shiny gold")

  return countBagsForRule(rules, rule!)
}

const puzzle1ExampleFile = String(
  fs.readFileSync(
    path.resolve(__dirname, `../../resources/2020/7/puzzle1Example.txt`)
  )
)
const puzzle2ExampleFile = String(
  fs.readFileSync(
    path.resolve(__dirname, `../../resources/2020/7/puzzle2Example.txt`)
  )
)
const dataFile = String(
  fs.readFileSync(path.resolve(__dirname, `../../resources/2020/7/data.txt`))
)

export const day7 = () => {
  console.log("\nDay 7 puzzle 1 example: (number of bag colors should be 4)")
  console.log(
    `Number of bag colors: ${countBagColors(puzzle1ExampleFile, "shiny gold")}`
  )

  console.log("\nDay 7 puzzle 1:")
  console.log(`Number of bag colors: ${countBagColors(dataFile, "shiny gold")}`)

  console.log("\nDay 7 puzzle 2 example 1: (should contain 32 other bags)")
  console.log(`Bags: ${countBags(puzzle1ExampleFile)}`)

  //console.log("\nDay 7 puzzle 2 example 2: (should contain 126 other bags)")
  //console.log(`Bags: ${countBags(puzzle2ExampleFile)}`)
}
