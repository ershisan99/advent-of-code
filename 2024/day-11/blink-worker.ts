import { parentPort, workerData } from "node:worker_threads";

const cache = new Map<number, Array<number>>();

function transformSingleStone(stone: number): number[] {
	if (cache.has(stone)) {
		// biome-ignore lint/style/noNonNullAssertion: it's there, I promise
		return cache.get(stone)!;
	}
	if (stone === 0) {
		cache.set(stone, [1]);
		return [1];
	}
	const numberAsString = stone.toString();
	const numberOfDigits = numberAsString.length;
	if (numberOfDigits % 2 === 0) {
		const middle = numberOfDigits / 2;
		const left = numberAsString.slice(0, middle);
		const right = numberAsString.slice(middle);
		const res = [Number.parseInt(left, 10), Number.parseInt(right, 10)];
		cache.set(stone, res);
		return res;
	}

	const res = [stone * 2024];
	cache.set(stone, res);
	return res;
}

function blink(stones: Array<number>) {
	const newStones: number[] = [];
	for (const stone of stones) {
		newStones.push(...transformSingleStone(stone));
	}
	return newStones;
}

const result = blink(workerData);

parentPort?.postMessage(result);
