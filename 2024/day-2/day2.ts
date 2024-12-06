import * as R from "remeda";

export async function day2(input: string) {
	const lines = input.split("\n");
	let count = 0;
	for (const line of lines) {
		const levels = line.split(" ").map((v) => Number.parseInt(v, 10));
		const safe = isSafe(levels);

		if (safe) {
			count++;
		}
	}
	return count;
}

export async function day2part2(input: string) {
	const lines = input.split("\n");
	let count = 0;
	for (const line of lines) {
		const levels = line.split(" ").map((v) => Number.parseInt(v, 10));
		const isFullySafe = isSafe(levels);

		if (isFullySafe) {
			count++;
			continue;
		}

		let isDampenedSafe = false;

		for (let i = 0; i < levels.length; i++) {
			const toTry = levels.toSpliced(i, 1);

			if (isSafe(toTry)) {
				isDampenedSafe = true;
				break;
			}
		}

		if (isDampenedSafe) {
			count++;
		}
	}

	return count;
}

function isSafe(levels: number[]) {
	const diffs = R.zip(levels, levels.slice(1)).map(([a, b]) => a - b);

	return (
		diffs.every((d) => 1 <= d && d <= 3) ||
		diffs.every((d) => -1 >= d && d >= -3)
	);
}
