import { expect, test } from "bun:test";
import * as path from "node:path";
import { day2, day2part2 } from "./day2.ts";

test("day 2, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const [testResult, finalResult] = await Promise.all([
		day2(testInput),
		day2(input),
	]);

	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(2);
	expect(finalResult).toEqual(359);
});

test("day 2, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const [testResult, finalResult] = await Promise.all([
		day2part2(testInput),
		day2part2(input),
	]);

	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(4);
	expect(finalResult).toEqual(418);
});
