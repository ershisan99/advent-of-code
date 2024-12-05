import { expect, test } from "bun:test";
import * as path from "node:path";
import { day5, day5part2 } from "./day5.ts";

test("day 5, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day5(testInput);
	const finalResult = day5(input);
	console.log("\n\n");
	console.log("Test data:", testResult);
	console.log("Full data:", finalResult);
	console.log("\n\n");

	expect(testResult).toEqual(143);
	expect(finalResult).toEqual(5588);
});

test("day 5, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day5part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	const finalResult = day5part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(5331);

	console.log("\n\n");

	expect(testResult).toEqual(123);
});
