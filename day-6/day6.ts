enum Direction {
	UP = 0,
	DOWN = 1,
	LEFT = 2,
	RIGHT = 3,
}

type Coordinates = [number, number];

type Grid = string[][];

function getNextCellCoordinates(
	coordinates: Coordinates,
	direction: Direction,
): Coordinates {
	const [x, y] = coordinates;
	if (direction === Direction.UP) {
		return [x - 1, y];
	}
	if (direction === Direction.DOWN) {
		return [x + 1, y];
	}
	if (direction === Direction.LEFT) {
		return [x, y - 1];
	}
	return [x, y + 1];
}

function isPathFinished(x: number, y: number, height: number, width: number) {
	if (x === -1 || y === -1 || x === height || y === width) {
		return true;
	}

	return false;
}

function getNewDirection(prev: Direction) {
	switch (prev) {
		case Direction.LEFT:
			return Direction.UP;
		case Direction.RIGHT:
			return Direction.DOWN;
		case Direction.DOWN:
			return Direction.LEFT;
		case Direction.UP:
			return Direction.RIGHT;
	}
}

export function day6(input: string) {
	const grid = input.split("\n").map((line) => line.split(""));
	const HEIGHT = grid.length;
	const WIDTH = grid[0].length;

	let direction = Direction.UP;
	let startCoords: Coordinates | null = null;
	const path: Coordinates[] = [];

	outer: for (let i = 0; i < grid.length; i++) {
		const line = grid[i];
		for (let j = 0; j < line.length; j++) {
			const cell = line[j];
			if (cell !== "^") {
				continue;
			}
			startCoords = [i, j];
			break outer;
		}
	}

	if (!startCoords) {
		throw new Error("no starting point");
	}

	path.push(startCoords);

	let isFinished = false;

	while (!isFinished) {
		const prev = path.at(-1);
		if (!prev) {
			throw new Error("never");
		}
		const [nextX, nextY] = getNextCellCoordinates(prev, direction);
		isFinished = isPathFinished(nextX, nextY, HEIGHT, WIDTH);
		if (isFinished) {
			break;
		}

		const nextCellContent = grid[nextX][nextY];

		if (nextCellContent === "#") {
			direction = getNewDirection(direction);
		} else {
			path.push([nextX, nextY]);
		}
	}

	const filtered = path.filter(
		(o, index, arr) =>
			arr.findIndex((item) => item[0] === o[0] && item[1] === o[1]) === index,
	);
	return filtered.length;
}

export function day6part2(input: string) {
	let count = 0;
	const grid = input.split("\n").map((line) => line.split(""));
	const h = grid.length;
	const w = grid[0].length;
	let startCoords: Coordinates | null = null;
	outer: for (let i = 0; i < grid.length; i++) {
		const line = grid[i];
		for (let j = 0; j < line.length; j++) {
			const cell = line[j];
			if (cell !== "^") {
				continue;
			}
			startCoords = [i, j];
			break outer;
		}
	}

	if (!startCoords) {
		throw new Error("no starting point");
	}

	for (let i = 0; i < grid.length; i++) {
		const line = grid[i];
		for (let j = 0; j < line.length; j++) {
			const newGrid = structuredClone(grid);
			const currentValue = newGrid[i][j];
			if (currentValue === "#" || currentValue === "^") {
				continue;
			}
			newGrid[i][j] = "#";
			const isLoop = checkInput(newGrid, startCoords, h, w);
			if (isLoop) count++;
		}
	}

	return count;
}

export function checkInput(
	grid: Grid,
	startCoords: Coordinates,
	h: number,
	w: number,
) {
	let direction = Direction.UP;
	const seen = new Set();

	const s = sc(startCoords, direction);
	seen.add(s);
	let prev = startCoords;
	while (true) {
		const [nextX, nextY] = getNextCellCoordinates(prev, direction);
		const isFinished = isPathFinished(nextX, nextY, h, w);
		if (isFinished) {
			break;
		}

		const nextCellContent = grid[nextX][nextY];

		if (nextCellContent === "#") {
			direction = getNewDirection(direction);
		} else {
			const s = sc([nextX, nextY], direction);
			const x = seen.has(s);

			if (x) {
				return true;
			}
			seen.add(s);
			prev = [nextX, nextY];
		}
	}
}

function sc(c: Coordinates, dir: Direction) {
	return [...c, dir].join(",");
}
