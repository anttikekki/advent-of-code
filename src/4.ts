import fs from "fs"
import path from "path"

interface Field {
  key: string
  value: string
}
type Passport = Array<Field>

const test = (file: string, validator: (passport: Passport) => boolean) => {
  const passports: Array<Passport> = file
    .split("\n\n")
    .map((passport) => passport.replace(/\n/gi, " "))
    .map((passport) =>
      passport.split(" ").map((field) => {
        const parts = field.trim().split(":")
        return { key: parts[0], value: parts[1] }
      })
    )

  //console.log(JSON.stringify(passports, undefined, 2))
  const requiredFieldKeys = [
    "byr", // (Birth Year)
    "iyr", // (Issue Year)
    "eyr", // (Expiration Year)
    "hgt", // (Height)
    "hcl", // (Hair Color)
    "ecl", // (Eye Color)
    "pid" // (Passport ID)
  ]

  const valid = passports
    .filter((passport) => {
      const keys = passport.map((field) => field.key)
      return requiredFieldKeys.every((requiredKey) =>
        keys.includes(requiredKey)
      )
    })
    .filter(validator)

  return valid.length
}

const puzzle1Validator = () => true

const puzzle2Validator = (passport: Passport): boolean => {
  return passport.every((field) => {
    switch (field.key) {
      case "byr": {
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        const year = parseInt(field.value)
        const result = year >= 1920 && year <= 2002
        //console.log(`Birth Year ${year} valid: ${result}`)
        return result
      }
      case "iyr": {
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        const year = parseInt(field.value)
        const result = year >= 2010 && year <= 2020
        //console.log(`Issue Year ${year} valid: ${result}`)
        return result
      }
      case "eyr": {
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        const year = parseInt(field.value)
        const result = year >= 2020 && year <= 2030
        //console.log(`Expiration Year ${year} valid: ${result}`)
        return result
      }
      case "hgt": {
        /**
         * hgt (Height) - a number followed by either cm or in:
         * If cm, the number must be at least 150 and at most 193.
         * If in, the number must be at least 59 and at most 76.
         */
        if (field.value.endsWith("cm")) {
          const height = parseInt(field.value.replace("cm", ""))
          const result = height >= 150 && height <= 193
          //console.log(`Height cm ${height} valid: ${result}`)
          return result
        }
        if (field.value.endsWith("in")) {
          const height = parseInt(field.value.replace("in", ""))
          const result = height >= 59 && height <= 76
          //console.log(`Height in ${height} valid: ${result}`)
          return result
        }
        //console.log(`Height ${field.value} valid: false`)
        return false
      }
      case "hcl": {
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        return field.value.length === 7 && field.value.match(/[#0-9a-f]/g)
      }
      case "ecl": {
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
          field.value
        )
      }
      case "pid": {
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        return field.value.length === 9 && !isNaN(parseInt(field.value))
      }
      case "cid": {
        //cid (Country ID) - ignored, missing or not.
        return true
      }
    }
    console.log(`Unknown key ${field.key}`)
    return false
  })
}

const puzzle1ExampleData = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/4/puzzle1Example.txt`))
)
const mainData = String(
  fs.readFileSync(path.resolve(__dirname, `../resources/4/data.txt`))
)
const puzzle2InvalidExampleData = String(
  fs.readFileSync(
    path.resolve(__dirname, `../resources/4/puzzle2InvalidExample.txt`)
  )
)
const puzzle2ValidExampleData = String(
  fs.readFileSync(
    path.resolve(__dirname, `../resources/4/puzzle2ValidExample.txt`)
  )
)

export const day4 = () => {
  console.log("Day 4 puzzle 1 with example data: (result should be 2)")
  console.log(`Valid passports: ${test(puzzle1ExampleData, puzzle1Validator)}`)

  console.log("\nDay 4 puzzle 1: (should be 247)")
  console.log(`Valid passports: ${test(mainData, puzzle1Validator)}`)

  console.log("\nDay 4 puzzle 2 invalid example data: (should be 0)")
  console.log(
    `Valid passports: ${test(puzzle2InvalidExampleData, puzzle2Validator)}`
  )

  console.log("\nDay 4 puzzle 2 valid example data: (should be 4)")
  console.log(
    `Valid passports: ${test(puzzle2ValidExampleData, puzzle2Validator)}`
  )

  console.log("\nDay 4 puzzle 2:")
  console.log(`Valid passports: ${test(mainData, puzzle2Validator)}`)
}
