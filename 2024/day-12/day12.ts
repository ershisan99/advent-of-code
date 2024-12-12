import { sum } from "remeda";

export function part1(input: string) {
	let final = 0;

	const startPoints: [number, number][] = [];
	const lines = input.split("\n");
	const grid = lines.map((l) => l.split(""));
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const letters = line.split("");
		for (let j = 0; j < letters.length; j++) {
			const letter = letters[j];
			if (grid[i - 1]?.[j] !== letter && grid[i]?.[j - 1] !== letter) {
				startPoints.push([i, j]);
			}
		}
	}

	while (startPoints.length > 0) {
		const th = startPoints.pop();
		const queue = [th];
		const seen = new Set<string>();
		while (queue.length > 0) {
			const current = queue.shift();
			if (!current) continue;
			if (seen.has(current.join(","))) continue;
			queue.push(
				...getNeighbors(grid, current).map(
					(x) => [x[0], x[1]] as [number, number],
				),
			);
			seen.add(current.join(","));
		}
		const area = seen.size;

		let perimiter = 0;
		seen.values().forEach((x) => {
			const [a, b] = x.split(",").map(Number);
			const neighbors = getNeighbors(grid, [a, b]);
			perimiter += 4 - neighbors.length;
		});

		final += perimiter * area;
		seen.values().forEach((x) => {
			const index = startPoints.findIndex((y) => y.join(",") === x);
			if (index !== -1) {
				startPoints.splice(index, 1);
			}
		});
	}

	return final;
}

export function part2(input: string) {
	let final = 0;

	const startPoints: [number, number][] = [];
	const lines = input.split("\n");
	const grid = lines.map((l) => l.split(""));
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const letters = line.split("");
		for (let j = 0; j < letters.length; j++) {
			const letter = letters[j];
			if (grid[i - 1]?.[j] !== letter && grid[i]?.[j - 1] !== letter) {
				startPoints.push([i, j]);
			}
		}
	}

	while (startPoints.length > 0) {
		const th = startPoints.pop();
		const queue = [th];
		const seen = new Set<string>();
		while (queue.length > 0) {
			const current = queue.shift();
			if (!current) continue;
			if (seen.has(current.join(","))) continue;
			queue.push(
				...getNeighbors(grid, current).map(
					(x) => [x[0], x[1]] as [number, number],
				),
			);
			seen.add(current.join(","));
		}

		const area = seen.size;
		const sides = getSides(seen);
		final += sides * area;
		seen.values().forEach((x) => {
			const index = startPoints.findIndex((y) => y.join(",") === x);
			if (index !== -1) {
				startPoints.splice(index, 1);
			}
		});
	}

	return final;
}

function getSides(region: Set<string>) {
	let sides = 0;
	const cornerCandidates = new Set<string>();
	for (const rc of region) {
		const [r, c] = rc.split(",").map(Number);
		for (const [cr, cc] of [
			[r - 0.5, c - 0.5],
			[r + 0.5, c - 0.5],
			[r + 0.5, c + 0.5],
			[r - 0.5, c + 0.5],
		]) {
			cornerCandidates.add([cr, cc].join(","));
		}
	}

	for (const g of cornerCandidates.values().toArray().sort()) {
		const [cr, cc] = g.split(",").map(Number);
		const config = [];
		for (const [sr, sc] of [
			[cr - 0.5, cc - 0.5],
			[cr + 0.5, cc - 0.5],
			[cr + 0.5, cc + 0.5],
			[cr - 0.5, cc + 0.5],
		]) {
			if (region.has([sr, sc].join(","))) {
				config.push(1);
			} else config.push(0);
		}
		const number = sum(config);
		if (number === 3 || number === 1) {
			sides++;
		}
		if (number === 2) {
			if (
				(config[0] === 0 && config[2] === 0) ||
				(config[1] === 0 && config[3] === 0)
			) {
				sides += 2;
			}
		}
	}
	return sides;
}

function getNeighbors(
	grid: string[][],
	[x, y]: [number, number],
): [number, number][] {
	const currentLetter = grid[x][y];
	const up = grid[x - 1]?.[y];
	const down = grid[x + 1]?.[y];
	const right = grid[x]?.[y + 1];
	const left = grid[x]?.[y - 1];
	return [
		up === currentLetter && [x - 1, y],
		down === currentLetter && [x + 1, y],
		right === currentLetter && [x, y + 1],
		left === currentLetter && [x, y - 1],
	].filter(Boolean) as [number, number][];
}
