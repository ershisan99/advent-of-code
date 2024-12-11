import { Worker } from "node:worker_threads";

export async function part1(input: string) {
	const lines = input.split("\n");
	const line = lines[0];
	const stones = line.split(" ").map(Number);
	stones.length = 1;
	// for (let i = 0; i < 75; i++) {
	// 	console.log(i);
	// 	stones = blink(stones);
	// }
	let final = 0;
	await Promise.all(
		stones.map(async (stone) => {
			const sum = (await new Promise((res) => {
				const worker = new Worker("./2024/day-11/workers.ts", {
					workerData: stone,
				});

				worker.on("message", (result) => {
					res(result);
				});
			})) as number;
			final += sum;
		}),
	);

	return final;
}

export function part2(input: string) {
	const lines = input.split("\n");
	const final = 0;
	return final;
}
