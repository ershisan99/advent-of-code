import { expect, test } from "bun:test"
import * as path from "node:path"
import { logLines } from "../../utils/log-lines.ts"
import {
	canExecuteMove,
	executeMove,
	getGPS,
	getRobotStartingPosition,
	part2,
} from "./day15-part2.ts"

test("day 15, part 2 test", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text()
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text()

	const testResult = await part2(testInput)
	console.log("\n\n")
	console.log("Test data:", testResult)
	expect(testResult).toEqual(9021)

	// const finalResult = await part2(input)
	// console.log("Full data:", finalResult)
	// expect(finalResult).toEqual(0)

	console.log("\n\n")
}, 1000000000000)

// test("day 15, part 2, canExecuteMove", async () => {
// 	const testInput = `
//
// ##############
// ##......##..##
// ##..........##
// ##...[][]...##
// ##....[]....##
// ##.....@....##
// ##############
//
// `.trim()
// 	const [gridStr] = testInput.split("\n\n")
// 	const grid = gridStr.split("\n").map((x) => x.split(""))
// 	const startingPos = getRobotStartingPosition(grid)
// 	try {
// 		const testResult = canExecuteMove(startingPos, grid, "^")
// 		console.log(testResult)
// 	} catch (e) {
// 		console.log("error", e)
// 	}
// })

test("day 15, part 2, executeMove", async () => {
	const testInput = `

0####################
1##[]..[]......[][]##
2##[]........@..[].##
3##..........[][][]##
4##...........[][].##
5##..##[]..[]......##
6##...[]...[]..[]..##
7##.....[]..[].[][]##
8##........[]......##
9####################

`.trim()
	const move = "v"
	const [gridStr] = testInput.split("\n\n")
	const grid = gridStr.split("\n").map((x) => x.split(""))
	const startingPos = getRobotStartingPosition(grid)
	try {
		const testResult = canExecuteMove(startingPos, grid, move)
		console.log(testResult)
		executeMove(grid, move, startingPos, "@")
		logLines(grid.map((x) => x.join("")))
	} catch (e) {
		console.log("error", e)
	}
})

test("day 15, part 2, getGPS", () => {
	const gridStr = `
####################
##[].......[].[][]##
##[]...........[].##
##[]........[][][]##
##[]......[]....[]##
##..##......[]....##
##..[]............##
##..@......[].[][]##
##......[][]..[]..##
####################
	`.trim()
	const grid = gridStr.split("\n").map((x) => x.split(""))

	expect(getGPS(grid)).toEqual(9021)
})
