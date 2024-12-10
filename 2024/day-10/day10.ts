export function part1(input: string) {
	let final = 0;

	const trailheads = [];
	const lines = input.split("\n");
	const grid = lines.map((l) => l.split("").map(Number));
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const heights = line.split("").map(Number);
		for (let j = 0; j < heights.length; j++) {
			const height = heights[j];
			if (height === 0) {
				trailheads.push([i, j]);
			}
		}
	}

	for (const th of trailheads) {
		const [x, y] = th;
		const finalPointsReached = [];
		function foo(path: [number, number][]) {
			if (path.length === 10) {
				finalPointsReached.push(path.at(-1));
				return;
			}
			const current = path.at(-1);
			const currentHeight = path.length - 1;

			if (!current) {
				throw new Error("must have at least one element");
			}
			const prev = path.at(-2);
			const [pX, pY] = prev ?? [];
			const [cX, cY] = current;
			const up = grid[cX - 1]?.[cY];
			const down = grid[cX + 1]?.[cY];
			const right = grid[cX]?.[cY + 1];
			const left = grid[cX]?.[cY - 1];
			const isPrevUp = pX === cX - 1 && pY === cY;
			const isPrevDown = pX === cX + 1 && pY === cY;
			const isPrevRight = pX === cX && pY === cY + 1;
			const isPrevLeft = pX === cX && pY === cY - 1;
			if (!isPrevUp && up === currentHeight + 1) {
				foo([...path, [cX - 1, cY]]);
			}
			if (!isPrevDown && down === currentHeight + 1) {
				foo([...path, [cX + 1, cY]]);
			}
			if (!isPrevRight && right === currentHeight + 1) {
				foo([...path, [cX, cY + 1]]);
			}
			if (!isPrevLeft && left === currentHeight + 1) {
				foo([...path, [cX, cY - 1]]);
			}
		}
		foo([th]);
		const uniqueFinalPoints = [
			...new Set(finalPointsReached.map((x) => x.join(","))),
		].map((x) => x.split(","));
		final += uniqueFinalPoints.length;
	}
	return final;
}
export function part2(input: string) {
	let final = 0;

	const trailheads = [];
	const lines = input.split("\n");
	const grid = lines.map((l) => l.split("").map(Number));
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const heights = line.split("").map(Number);
		for (let j = 0; j < heights.length; j++) {
			const height = heights[j];
			if (height === 0) {
				trailheads.push([i, j]);
			}
		}
	}

	for (const th of trailheads) {
		const [x, y] = th;
		function foo(path: [number, number][]) {
			if (path.length === 10) {
				final++;
				return;
			}
			const current = path.at(-1);
			const currentHeight = path.length - 1;

			if (!current) {
				throw new Error("must have at least one element");
			}
			const prev = path.at(-2);
			const [pX, pY] = prev ?? [];
			const [cX, cY] = current;
			const up = grid[cX - 1]?.[cY];
			const down = grid[cX + 1]?.[cY];
			const right = grid[cX]?.[cY + 1];
			const left = grid[cX]?.[cY - 1];
			const isPrevUp = pX === cX - 1 && pY === cY;
			const isPrevDown = pX === cX + 1 && pY === cY;
			const isPrevRight = pX === cX && pY === cY + 1;
			const isPrevLeft = pX === cX && pY === cY - 1;
			if (!isPrevUp && up === currentHeight + 1) {
				foo([...path, [cX - 1, cY]]);
			}
			if (!isPrevDown && down === currentHeight + 1) {
				foo([...path, [cX + 1, cY]]);
			}
			if (!isPrevRight && right === currentHeight + 1) {
				foo([...path, [cX, cY + 1]]);
			}
			if (!isPrevLeft && left === currentHeight + 1) {
				foo([...path, [cX, cY - 1]]);
			}
		}
		foo([th]);
	}
	return final;
}

function logLines(arr: Array<unknown>) {
	for (const x of arr) {
		console.log(x);
	}
}
