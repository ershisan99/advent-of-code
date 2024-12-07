import { expect, test } from "bun:test";
import * as path from "node:path";
import { day7, day7part2 } from "./day7.ts";

test("day 7, part 1", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	console.log("\n\n");

	const testResult = day7(testInput);
	console.log("Test data:", testResult);
	expect(testResult).toEqual(3749);

	const finalResult = day7(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(28730327770375);

	console.log("\n\n");
});

test("day 7, part 2", async () => {
	const testInput = await Bun.file(
		path.resolve(__dirname, "test-input.txt"),
	).text();
	const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();

	const testResult = day7part2(testInput);
	console.log("\n\n");
	console.log("Test data:", testResult);
	expect(testResult).toEqual(11387);
	const finalResult = day7part2(input);
	console.log("Full data:", finalResult);
	expect(finalResult).toEqual(424977609625985);

	console.log("\n\n");
});
