import { logLines } from "../../utils/log-lines.ts"
const keypress = async () => {
	process.stdin.setRawMode(true)
	return new Promise((resolve) =>
		process.stdin.once("data", (data) => {
			const byteArray = [...data]
			if (byteArray.length > 0 && byteArray[0] === 3) {
				console.log("^C")
				process.exit(1)
			}
			process.stdin.setRawMode(false)
			resolve()
		}),
	)
}
enum Move {
	Up = "^",
	Down = "v",
	Right = ">",
	Left = "<",
}

enum Unit {
	Box = "O",
	Robot = "@",
	Wall = "#",
	Empty = ".",
}

type Grid = Unit[][]
type Coordinates = [number, number]

export async function part1(input: string) {
	const { moves, grid } = parseInput(input)
	let robotPosition = getRobotStartingPosition(grid)
	for (const move of moves) {
		try {
			const emptySqCoords = canExecuteMove(robotPosition, grid, move)
			robotPosition = await executeMove(grid, move, emptySqCoords)
		} catch (e) {
			// console.log("error", e.message)
		}
	}
	logGrid(grid)
	return getGPS(grid)
}

export function parseInput(input: string) {
	const [gridStr, movesStr] = input.split("\n\n")
	const moves = movesStr
		.split("\n")
		.join("")
		.split("")
		.map((move) => {
			if (move === Move.Up) {
				return Move.Up
			}
			if (move === Move.Down) {
				return Move.Down
			}
			if (move === Move.Right) {
				return Move.Right
			}
			if (move === Move.Left) {
				return Move.Left
			}
			throw new Error(`Invalid input: ${move}`)
		})

	const grid = gridStr.split("\n").map((line) =>
		line.split("").map((u) => {
			if (u === Unit.Box) {
				return Unit.Box
			}
			if (u === Unit.Empty) {
				return Unit.Empty
			}
			if (u === Unit.Robot) {
				return Unit.Robot
			}
			if (u === Unit.Wall) {
				return Unit.Wall
			}
			throw new Error(`Invalid input unit: ${u}`)
		}),
	)
	return { moves, grid }
}

export function getRobotStartingPosition(grid: Grid): Coordinates {
	for (let i = 0; i < grid.length; i++) {
		const line = grid[i]
		for (let i1 = 0; i1 < line.length; i1++) {
			const unit = line[i1]
			if (unit === Unit.Robot) {
				return [i, i1]
			}
		}
	}
	throw new Error("Robot not found")
}

export function canExecuteMove(
	position: Coordinates,
	grid: Grid,
	move: Move,
): Coordinates {
	// console.log("CAN EXECUTE?: ")
	// logGrid(grid)

	const { unit: nextItem, coordinates: nextItemCoordinates } = getNextItem(
		position,
		grid,
		move,
	)

	if (!nextItem) {
		throw new Error("wtf")
	}
	if (nextItem === Unit.Wall) {
		throw new Error("Wall found, can't execute move sequence.")
	}
	if (nextItem === Unit.Empty) {
		return nextItemCoordinates
	}
	return canExecuteMove(nextItemCoordinates, grid, move)
}

export async function executeMove(
	grid: Grid,
	move: Move,
	emptySquareCoordinates: Coordinates,
): Promise<Coordinates> {
	if (move === Move.Down) {
		let currentCoordinates = emptySquareCoordinates
		while (true) {
			// console.log(move, currentCoordinates)
			// logGrid(grid)
			const [cr, cc] = currentCoordinates
			const prevItem = grid[cr - 1][cc]
			if (prevItem === Unit.Robot) {
				grid[cr][cc] = Unit.Robot
				grid[cr - 1][cc] = Unit.Empty
				return [cr, cc]
			}
			grid[cr][cc] = prevItem
			currentCoordinates = [cr - 1, cc]
		}
	}
	if (move === Move.Up) {
		let currentCoordinates = emptySquareCoordinates
		while (true) {
			// console.log(move, currentCoordinates)
			// logGrid(grid)
			const [cr, cc] = currentCoordinates
			const prevItem = grid[cr + 1][cc]
			if (prevItem === Unit.Robot) {
				grid[cr][cc] = Unit.Robot
				grid[cr + 1][cc] = Unit.Empty
				return [cr, cc]
			}
			grid[cr][cc] = prevItem
			currentCoordinates = [cr + 1, cc]
		}
	}
	if (move === Move.Right) {
		let currentCoordinates = emptySquareCoordinates
		while (true) {
			// await keypress()
			// console.log(move, currentCoordinates)
			// logGrid(grid)

			const [cr, cc] = currentCoordinates
			const prevItem = grid[cr][cc - 1]
			if (prevItem === Unit.Robot) {
				grid[cr][cc] = Unit.Robot
				grid[cr][cc - 1] = Unit.Empty
				return [cr, cc]
			}
			grid[cr][cc] = prevItem
			currentCoordinates = [cr, cc - 1]
		}
	}
	if (move === Move.Left) {
		let currentCoordinates = emptySquareCoordinates
		while (true) {
			// await keypress()
			// console.log(move, currentCoordinates)
			// logGrid(grid)

			const [cr, cc] = currentCoordinates
			const prevItem = grid[cr][cc + 1]
			if (prevItem === Unit.Robot) {
				grid[cr][cc] = Unit.Robot
				grid[cr][cc + 1] = Unit.Empty
				return [cr, cc]
			}
			grid[cr][cc] = prevItem
			currentCoordinates = [cr, cc + 1]
		}
	}
	throw new Error("asdf")
}

function getNextItem([r, c]: Coordinates, grid: Grid, move: Move) {
	let coordinates: Coordinates
	if (move === Move.Left) {
		coordinates = [r, c - 1]
	} else if (move === Move.Right) {
		coordinates = [r, c + 1]
	} else if (move === Move.Up) {
		coordinates = [r - 1, c]
	} else if (move === Move.Down) {
		coordinates = [r + 1, c]
	} else {
		throw new Error("Invalid input for getNextItem")
	}

	const unit = grid[coordinates[0]][coordinates[1]] as Unit | undefined
	return { unit, coordinates }
}

function getGPS(grid: Grid) {
	let GPS = 0
	for (let i = 0; i < grid.length; i++) {
		const line = grid[i]
		for (let i1 = 0; i1 < line.length; i1++) {
			const unit = line[i1]
			if (unit === Unit.Box) {
				GPS += i * 100 + i1
			}
		}
	}
	return GPS
}

function logGrid(grid: Grid) {
	logLines(grid.map((x) => x.join("")))
}
