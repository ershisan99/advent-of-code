import { expect, test } from "bun:test";
import * as path from "node:path";
import { part1, part2 } from "./day13.ts";

test("day 13, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	console.log("\n\n");

	const testResult = part1(testInput);
	console.log("Test data:", testResult);
	expect(testResult).toEqual(480);

	const finalResult = part1(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(27105);

	console.log("\n\n");
});

test("day 13, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	expect(testResult).toEqual(875318608908);

	const finalResult = part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(101726882250942);

	console.log("\n\n");
});
