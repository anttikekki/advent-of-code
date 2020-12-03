import { day1 } from "./1"
import { day2 } from "./2"
import { day3 } from "./3"

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
  default:
    console.log("Unknown day: ", day)
}
