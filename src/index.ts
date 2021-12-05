import { day1_2020 } from "./2020/1"
import { day2_2020 } from "./2020/2"
import { day3_2020 } from "./2020/3"
import { day4_2020 } from "./2020/4"
import { day5_2020 } from "./2020/5"
import { day6_2020 } from "./2020/6"
import { day7_2020 } from "./2020/7"
import { day8_2020 } from "./2020/8"
import { day1_2021 } from "./2021/1"
import { day2_2021 } from "./2021/2"
import { day3_2021 } from "./2021/3"
import { day4_2021 } from "./2021/4"

const year = process.argv[2]
const day = process.argv[3]
console.log("Runnin year ", year, " day ", day)

if (year === "2020") {
  switch (day) {
    case "1":
      day1_2020()
      break
    case "2":
      day2_2020()
      break
    case "3":
      day3_2020()
      break
    case "4":
      day4_2020()
      break
    case "5":
      day5_2020()
      break
    case "6":
      day6_2020()
      break
    case "7":
      day7_2020()
      break
    case "8":
      day8_2020()
      break
    default:
      console.error("Unknown day ", day, " for year 2020")
  }
} else if (year === "2021") {
  switch (day) {
    case "1":
      day1_2021()
      break
    case "2":
      day2_2021()
      break
    case "3":
      day3_2021()
      break
    case "4":
      day4_2021()
      break
    default:
      console.error("Unknown day ", day, " for year 2021")
  }
} else {
  console.error("Unknown year ", year)
}
