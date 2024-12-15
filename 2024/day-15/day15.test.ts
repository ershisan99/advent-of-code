import { expect, test } from "bun:test"
import * as path from "node:path"
import { logLines } from "../../utils/log-lines.ts"
import {
	canExecuteMove,
	executeMove,
	getRobotStartingPosition,
	parseInput,
	part1,
} from "./day15.ts"

test("day 15, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text()
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text()

	console.log("\n\n")

	// const testResult = await part1(testInput)
	// console.log("Test data:", testResult)
	// expect(testResult).toEqual(10092)

	const finalResult = await part1(input)
	console.log("Full data:", finalResult)
	expect(finalResult).toEqual(0)

	console.log("\n\n")
}, 1000000000000)

// test("day 15, canExecuteMove", async () => {
// 	const testInput = `
//
// ########
// #...@OO#
// ##..O..#
// #...O..#
// #.#.O..#
// #...O..#
// #......#
// ########
//
// v
//
// `.trim()
// 	const { grid, moves } = parseInput(testInput)
// 	const startingPos = getRobotStartingPosition(grid)
// 	try {
// 		const testResult = canExecuteMove(startingPos, grid, moves[0])
// 		console.log(testResult)
// 	} catch (e) {
// 		console.log("error", e)
// 	}
// })

test("day 15, executeMove", async () => {
	const testInput = `
	
########
#...@OO#
##..O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

v

`.trim()
	const { grid, moves } = parseInput(testInput)
	const startingPos = getRobotStartingPosition(grid)
	try {
		const testResult = canExecuteMove(startingPos, grid, moves[0])
		const newGrid = executeMove(grid, moves[0], testResult)
		logLines(newGrid.map((x) => x.join("")))
	} catch (e) {
		console.log("error", e)
	}
})
