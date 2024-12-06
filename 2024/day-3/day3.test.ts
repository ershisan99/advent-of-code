import { expect, test } from "bun:test";
import * as path from "node:path";
import { day3, day3part2 } from "./day3.ts";

test("day 3, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const [testResult, finalResult] = await Promise.all([
		day3(testInput),
		day3(input),
	]);

	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(161);
	expect(finalResult).toEqual(191183308);
});

test("day 3, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const [testResult, finalResult] = await Promise.all([
		day3part2(testInput),
		day3part2(input),
	]);

	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(48);
	expect(finalResult).toEqual(92082041);
});
