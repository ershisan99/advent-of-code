import { expect, test } from "bun:test";
import * as path from "node:path";
import { part1, part2 } from "./day10.ts";

test("day 10, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	console.log("\n\n");

	// const testResult = part1(testInput);
	// console.log("Test data:", testResult);
	// expect(testResult).toEqual(36);

	const finalResult = part1(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(682);

	console.log("\n\n");
});

test("day 10, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	expect(testResult).toEqual(81);

	const finalResult = part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(1511);

	console.log("\n\n");
});
