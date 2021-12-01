import { day1 } from "./2020/1"
import { day2 } from "./2020/2"
import { day3 } from "./2020/3"
import { day4 } from "./2020/4"
import { day5 } from "./2020/5"
import { day6 } from "./2020/6"
import { day7 } from "./2020/7"
import { day8 } from "./2020/8"

const year = process.argv[2]
const day = process.argv[3]
console.log("Runnin year ", year, " day ", day)

switch (day) {
  case "1":
    day1()
    break
  case "2":
    day2()
    break
  case "3":
    day3()
    break
  case "4":
    day4()
    break
  case "5":
    day5()
    break
  case "6":
    day6()
    break
  case "7":
    day7()
    break
  case "8":
    day8()
    break
  default:
    console.error("Unknown year ", year, " day ", day)
}
