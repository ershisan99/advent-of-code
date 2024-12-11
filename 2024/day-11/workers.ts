import { Worker, parentPort, workerData } from "node:worker_threads";
import { chunk } from "remeda";
let stones = [workerData];
for (let i = 0; i < 75; i++) {
	console.log(i);
	const chunks = chunk(stones, 5_000_000);
	const newStones = await Promise.all(
		chunks.map((chunk) => processChunk(chunk)),
	);
	stones = newStones.flat(1);
}

parentPort?.postMessage(stones.length);

async function processChunk(chunk: number[]) {
	console.log("processing chunk of length", chunk.length);
	return await new Promise((res) => {
		const worker = new Worker("./2024/day-11/blink-worker.ts", {
			workerData: chunk,
		});

		worker.on("message", (result) => {
			res(result);
		});
	});
}
// async function processChunk(chunk: number[]) {
// 	console.log("processing chunk of length", chunk.length);
// 	const result = await pool.exec("blink", [chunk]);
// }
