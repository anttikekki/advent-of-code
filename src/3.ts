import fs from "fs"
import path from "path"

const test = (filename: string) => {
  const filePath = path.resolve(__dirname, `../resources/3/${filename}`)
  const file = fs.readFileSync(filePath)

  const map = new String(file).split("\n").map((line) => line.split(""))
  const maxMapYIndex = map.length - 1
  const maxMapXIndex = map[0].length - 1
  console.log(
    `Map size: height=${map.length}, width=${map[0].length}, maxYIndex=${maxMapXIndex}, maxXIndex=${maxMapXIndex}`
  )

  let coordinate: [number, number] = [0, 0] // y, x
  let trees = 0

  while (coordinate[0] <= maxMapYIndex) {
    const tile = map[coordinate[0]][coordinate[1]]
    if (tile === "#") {
      trees++
    }

    // right 3, down 1
    const nextY = coordinate[0] + 1
    let nextX = coordinate[1] + 3
    if (nextX > maxMapXIndex) {
      const wrapIndex = nextX - (maxMapXIndex + 1)
      console.log(`Map limit reached. y=${nextY}, x=${nextX} --> ${wrapIndex}`)
      nextX = wrapIndex
    }
    coordinate = [nextY, nextX]
  }

  console.log(`Final coordinate: y=${coordinate[0]}, x=${coordinate[1]}`)
  console.log(`Number of trees: ${trees}`)
}

export const day3 = () => {
  console.log("Day 3 puzzle 1 with example data: (should be 7 trees)")
  test("example.txt")

  console.log("\nDay 3 puzzle 1:")
  test("data.txt")
}
