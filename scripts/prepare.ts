import * as path from "node:path";
import { $ } from "bun";
async function prepare(day: number, year?: number) {
	const currentYear = year ?? new Date().getFullYear();
	const fileName = `day${day}.ts`;
	const testFileName = `day${day}.test.ts`;
	const dir = path.join(__dirname, "..", currentYear.toString(), `day-${day}`);
	console.log(`Preparing ${dir}`);
	const codeTemplate = `
        export function part1(input: string) {
            const lines = input.split("\\n");
            let final = 0;
            return final;
        }
        
         export function part2(input: string) {
            const lines = input.split("\\n");
            let final = 0;
            return final;
        }
    `.trim();

	const testTemplate = `
	import { expect, test } from "bun:test";
    import * as path from "node:path";
    import { part1, part2 } from "./${fileName}";

    test("day ${day}, part 1", async () => {
        const testInput = await Bun.file(
            path.resolve(__dirname, "test-input.txt"),
        ).text();
        const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();
    
        console.log("\\n\\n");
    
        const testResult = part1(testInput);
        console.log("Test data:", testResult);
        expect(testResult).toEqual(0);
    
        // const finalResult = part1(input);
        // console.log("Full data:", finalResult);
        // expect(finalResult).toEqual(0);
    
        console.log("\\n\\n");
    });

    test("day ${day}, part 2", async () => {
        const testInput = await Bun.file(
        path.resolve(__dirname, "test-input.txt"),
        ).text();
        const input = await Bun.file(path.resolve(__dirname, "input.txt")).text();
    
        const testResult = part2(testInput);
        console.log("\\n\\n");
        console.log("Test data:", testResult);
        expect(testResult).toEqual(0);
        
        // const finalResult = part2(input);
        // console.log("Full data:", finalResult);
        // expect(finalResult).toEqual(0);
    
        console.log("\\n\\n");
    });
    `;

	await Bun.write(path.join(dir, testFileName), testTemplate);
	await Bun.write(path.join(dir, fileName), codeTemplate);
	await Bun.write(path.join(dir, "test-input.txt"), "");
	await Bun.write(path.join(dir, "input.txt"), "");
	console.log(await $`bunx biome check --write ${dir}`.text());
}

const [_, __, day, year] = process.argv;
void prepare(Number(day), year ? Number(year) : undefined);
