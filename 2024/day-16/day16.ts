import { solveMaze } from "./maze.ts"

export function part1(input: string) {
	const grid = parseInput(input)
	return solveMaze(grid)
}

export function part2(input: string) {
	return 0
}

function parseInput(input: string) {
	const lines = input.split("\n")
	return lines.map((l) => l.split(""))
}
