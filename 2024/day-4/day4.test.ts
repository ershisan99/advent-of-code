import { expect, test } from "bun:test";
import * as path from "node:path";
import { day4, day4part2 } from "./day4.ts";

test("day 4, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day4(testInput);
	const finalResult = day4(input);
	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(18);
	expect(finalResult).toEqual(2358);
});

test("day 4, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day4part2(testInput);
	const finalResult = day4part2(input);
	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(9);
	expect(finalResult).toEqual(92082041);
});
