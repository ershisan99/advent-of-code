const cache = new Map<string, number>();

export function part1(input: string) {
	const lines = input.split("\n");
	const line = lines[0];
	const stones = line.split(" ").map(Number);
	let total = 0;
	for (const stone of stones) {
		total += count(stone, 25);
	}
	return total;
}

export function part2(input: string) {
	const lines = input.split("\n");
	const line = lines[0];
	const stones = line.split(" ").map(Number);
	let total = 0;
	for (const stone of stones) {
		total += count(stone, 75);
	}
	return total;
}

function count(stone: number, steps: number): number {
	const key = `${stone},${steps}`;

	if (cache.has(key)) {
		return cache.get(key) as number;
	}

	if (steps === 0) {
		const res = 1;
		cache.set(key, res);
		return res;
	}
	if (stone === 0) {
		const res = count(1, steps - 1);
		cache.set(key, res);
		return res;
	}
	const numberAsString = stone.toString();
	const numberOfDigits = numberAsString.length;
	if (numberOfDigits % 2 === 0) {
		const middle = numberOfDigits / 2;
		const left = numberAsString.slice(0, middle);
		const right = numberAsString.slice(middle);
		const res =
			count(Number.parseInt(left, 10), steps - 1) +
			count(Number.parseInt(right, 10), steps - 1);
		cache.set(key, res);
		return res;
	}
	const res = count(stone * 2024, steps - 1);
	cache.set(key, res);
	return res;
}
