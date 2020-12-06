import { day1 } from "./1"
import { day2 } from "./2"
import { day3 } from "./3"
import { day4 } from "./4"
import { day5 } from "./5"
import { day6 } from "./6"

var day = process.argv[2]
console.log("Runnin day ", day)

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
  default:
    console.log("Unknown day: ", day)
}
