import { expect, test } from "bun:test";
import * as path from "node:path";
import { part1, part2 } from "./day9.ts";

test("day 9, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	console.log("\n\n");

	const testResult = part1(testInput);
	console.log("Test data:", testResult);
	expect(testResult).toEqual(1928);

	const finalResult = part1(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(6349606724455);

	console.log("\n\n");
});

test("day 9, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	expect(testResult).toEqual(2858);

	const finalResult = part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(6376648986651);

	console.log("\n\n");
});
