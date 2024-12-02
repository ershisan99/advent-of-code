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
	let increasing = null;
	let safe = true;

	for (let i = 0; i < levels.length - 1; i++) {
		const current = levels[i];
		const next = levels[i + 1];
		const diff = Math.abs(next - current);

		if (diff > 3 || diff < 1) {
			safe = false;
			break;
		}

		if (i === 0) {
			increasing = next > current;
			continue;
		}

		if (increasing && next <= current) {
			safe = false;
			break;
		}

		if (!increasing && next >= current) {
			safe = false;
			break;
		}
	}
	return safe;
}
