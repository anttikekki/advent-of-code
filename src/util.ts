import fs from "fs"
import path from "path"

export const loadFileRows = (
  year: number,
  day: number,
  fileName: string
): Array<string> => {
  const filePath = path.resolve(
    __dirname,
    `../resources/${year}/${day}/${fileName}`
  )
  const file = fs.readFileSync(filePath)
  return new String(file).split("\n")
}
