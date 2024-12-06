import { expect, test } from "bun:test";
import * as path from "node:path";
import { day6, day6part2 } from "./day6.ts";

test("day 6, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day6(testInput);
	const finalResult = day6(input);
	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(41);
	expect(finalResult).toEqual(5153);
});

test("day 6, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day6part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	expect(testResult).toEqual(6);
	const finalResult = day6part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(1711);

	console.log("\n\n");
});
