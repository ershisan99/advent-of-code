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

enum LargeUnit {
	BoxLeft = "[",
	BoxRight = "]",
}

type Grid = (Unit | LargeUnit)[][]
type Coordinates = [number, number]

export async function part2(input: string) {
	const { moves, grid } = parseInput(input)
	for (const move of moves) {
		console.log(`Moving ${move}`)
		logGrid(grid)
		await keypress()
		try {
			const robotPosition = getRobotStartingPosition(grid)
			canExecuteMove(robotPosition, grid, move)
			executeMove(grid, move, robotPosition, Unit.Robot)
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
		line.split("").flatMap((u) => {
			if (u === Unit.Box) {
				return [LargeUnit.BoxLeft, LargeUnit.BoxRight]
			}
			if (u === Unit.Empty) {
				return [Unit.Empty, Unit.Empty]
			}
			if (u === Unit.Robot) {
				return [Unit.Robot, Unit.Empty]
			}
			if (u === Unit.Wall) {
				return [Unit.Wall, Unit.Wall]
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
	const currentUnit = grid[position[0]][position[1]]

	if (!nextItem) {
		throw new Error("wtf")
	}
	if (nextItem === Unit.Wall) {
		throw new Error("Wall found, can't execute move sequence.")
	}
	if (nextItem === Unit.Empty) {
		return nextItemCoordinates
	}
	if (move === Move.Up || move === Move.Down) {
		if (currentUnit === Unit.Robot) {
			if (nextItem === LargeUnit.BoxRight) {
				const checkRight = canExecuteMove(nextItemCoordinates, grid, move)
				const checkLeft = canExecuteMove(
					[nextItemCoordinates[0], nextItemCoordinates[1] - 1],
					grid,
					move,
				)
				return
			}
			if (nextItem === LargeUnit.BoxLeft) {
				const checkRight = canExecuteMove(
					[nextItemCoordinates[0], nextItemCoordinates[1] + 1],
					grid,
					move,
				)
				const checkLeft = canExecuteMove(nextItemCoordinates, grid, move)
				return
			}
		}
		if (currentUnit === LargeUnit.BoxRight) {
			if (nextItem === LargeUnit.BoxLeft) {
				const checkUp = canExecuteMove(nextItemCoordinates, grid, move)
				const checkRight = canExecuteMove(
					[nextItemCoordinates[0], nextItemCoordinates[1] + 1],
					grid,
					move,
				)
				return
			}
		}
		if (currentUnit === LargeUnit.BoxLeft) {
			if (nextItem === LargeUnit.BoxRight) {
				const checkUp = canExecuteMove(nextItemCoordinates, grid, move)
				const checkLeft = canExecuteMove(
					[nextItemCoordinates[0], nextItemCoordinates[1] - 1],
					grid,
					move,
				)
				return
			}
		}
	}

	return canExecuteMove(nextItemCoordinates, grid, move)
}

export function executeMove(
	grid: Grid,
	move: Move,
	currentCoordinates: Coordinates,
	currentUnit: Unit | LargeUnit,
) {
	if (move === Move.Down) {
		const [cr, cc] = currentCoordinates
		const [nr, nc] = [cr + 1, cc]
		const nextUnit = grid[nr][nc]
		if (currentUnit === Unit.Robot && nextUnit === LargeUnit.BoxLeft) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			grid[cr][cc] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		} else if (currentUnit === Unit.Robot && nextUnit === LargeUnit.BoxRight) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			grid[cr][cc] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxLeft &&
			nextUnit === LargeUnit.BoxRight
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxRight &&
			nextUnit === LargeUnit.BoxLeft
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		} else if (nextUnit === Unit.Empty) {
			if (currentUnit === Unit.Robot) {
				grid[cr][cc] = Unit.Empty
			}
			grid[nr][nc] = currentUnit
			return
		} else if (
			currentUnit === LargeUnit.BoxRight &&
			nextUnit === LargeUnit.BoxRight
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxLeft &&
			nextUnit === LargeUnit.BoxLeft
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		}
	} else if (move === Move.Up) {
		const [cr, cc] = currentCoordinates
		const [nr, nc] = [cr - 1, cc]
		const nextUnit = grid[nr][nc]
		if (currentUnit === Unit.Robot && nextUnit === LargeUnit.BoxLeft) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			grid[cr][cc] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		} else if (currentUnit === Unit.Robot && nextUnit === LargeUnit.BoxRight) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			grid[cr][cc] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxLeft &&
			nextUnit === LargeUnit.BoxRight
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxRight &&
			nextUnit === LargeUnit.BoxLeft
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		} else if (nextUnit === Unit.Empty) {
			if (currentUnit === Unit.Robot) {
				grid[cr][cc] = Unit.Empty
			}
			grid[nr][nc] = currentUnit
			return
		} else if (
			currentUnit === LargeUnit.BoxRight &&
			nextUnit === LargeUnit.BoxRight
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc - 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc - 1], LargeUnit.BoxLeft)
		} else if (
			currentUnit === LargeUnit.BoxLeft &&
			nextUnit === LargeUnit.BoxLeft
		) {
			grid[nr][nc] = currentUnit
			grid[nr][nc + 1] = Unit.Empty
			executeMove(grid, move, [nr, nc], nextUnit)
			executeMove(grid, move, [nr, nc + 1], LargeUnit.BoxRight)
		}
	} else if (move === Move.Right) {
		const [cr, cc] = currentCoordinates
		const [nr, nc] = [cr, cc + 1]
		const nextUnit = grid[nr][nc]
		grid[nr][nc] = currentUnit
		if (currentUnit === Unit.Robot) {
			grid[cr][cc] = Unit.Empty
		}
		if (nextUnit === Unit.Empty) {
			return
		}
		executeMove(grid, move, [nr, nc], nextUnit)
	} else if (move === Move.Left) {
		const [cr, cc] = currentCoordinates
		const [nr, nc] = [cr, cc - 1]
		const nextUnit = grid[nr][nc]

		grid[nr][nc] = currentUnit
		if (currentUnit === Unit.Robot) {
			grid[cr][cc] = Unit.Empty
		}
		if (nextUnit === Unit.Empty) {
			return
		}
		executeMove(grid, move, [nr, nc], nextUnit)
	} else throw new Error(`wrong move: ${move}`)
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

	const unit = grid[coordinates[0]][coordinates[1]] as
		| Unit
		| LargeUnit
		| undefined
	return { unit, coordinates }
}

export function getGPS(grid: Grid) {
	let GPS = 0
	for (let i = 0; i < grid.length; i++) {
		const line = grid[i]
		for (let i1 = 0; i1 < line.length; i1++) {
			const unit = line[i1]
			if (unit === LargeUnit.BoxLeft) {
				GPS += i * 100 + i1
			}
		}
	}
	return GPS
}

function logGrid(grid: Grid) {
	logLines(grid.map((x) => x.join("")))
}
