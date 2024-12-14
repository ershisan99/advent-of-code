import { describe, expect, test } from "bun:test"
import * as path from "node:path"
import { calculateNextPosition, part1, part2 } from "./day14.ts"

const WIDTH = 101
const HEIGHT = 103

const TEST_WIDTH = 11
const TEST_HEIGHT = 7

test("day 14, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text()
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text()

	console.log("\n\n")

	const testResult = part1(testInput, TEST_WIDTH, TEST_HEIGHT)
	console.log("Test data:", testResult)
	expect(testResult).toEqual(12)

	const finalResult = part1(input, WIDTH, HEIGHT)
	console.log("Full data:", finalResult)
	expect(finalResult).toEqual(215987200)

	console.log("\n\n")
})

test("day 14, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text()
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text()

	// const testResult = part2(testInput, TEST_WIDTH, TEST_HEIGHT)
	// // console.log("\n\n")
	// // console.log("Test data:", testResult)
	// expect(testResult).toEqual(0)

	const finalResult = part2(input, WIDTH, HEIGHT)
	console.log("Full data:", finalResult)
	expect(finalResult).toEqual(8050)

	console.log("\n\n")
})

describe("calculate next position", () => {
	test("after 1 second", () => {
		const start = [2, 4]
		const velocity = [2, -3] as const
		const [x, y] = calculateNextPosition(
			start,
			velocity,
			TEST_WIDTH,
			TEST_HEIGHT,
		)
		console.log({ x, y })
		expect(x).toEqual(4)
		expect(y).toEqual(1)
	})
	test("after 2 seconds", () => {
		const start = [4, 1]
		const velocity = [2, -3] as const
		const [x, y] = calculateNextPosition(
			start,
			velocity,
			TEST_WIDTH,
			TEST_HEIGHT,
		)
		console.log({ x, y })
		expect(x).toEqual(6)
		expect(y).toEqual(5)
	})
	test("after 3 seconds", () => {
		const start = [6, 5]
		const velocity = [2, -3] as const
		const [x, y] = calculateNextPosition(
			start,
			velocity,
			TEST_WIDTH,
			TEST_HEIGHT,
		)
		console.log({ x, y })
		expect(x).toEqual(8)
		expect(y).toEqual(2)
	})
	test("after 4 seconds", () => {
		const start = [8, 2]
		const velocity = [2, -3] as const
		const [x, y] = calculateNextPosition(
			start,
			velocity,
			TEST_WIDTH,
			TEST_HEIGHT,
		)
		console.log({ x, y })
		expect(x).toEqual(10)
		expect(y).toEqual(6)
	})
	test("after 4 seconds", () => {
		const start = [10, 6]
		const velocity = [2, -3] as const
		const [x, y] = calculateNextPosition(
			start,
			velocity,
			TEST_WIDTH,
			TEST_HEIGHT,
		)
		console.log({ x, y })
		expect(x).toEqual(1)
		expect(y).toEqual(3)
	})
})
