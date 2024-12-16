import { PriorityQueue } from "@datastructures-js/priority-queue"

type Point = [number, number]
type OhGod = [number, number, number, number, number]
export function solveMaze(maze: string[][]): number {
	const rows = maze.length
	const cols = maze[0].length
	let start: Point | null = null

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const char = maze[r][c]
			if (char === "S") {
				start = [r, c]
				break
			}
		}
		if (start) {
			break
		}
	}
	if (!start) throw Error("fuck")
	const queue = new PriorityQueue<OhGod>((a, b) => a[0] - b[0])

	queue.enqueue([0, start[0], start[1], 0, 1])

	const seen = new Set<string>([stringify(start[0], start[1], 0, 1)])

	while (!queue.isEmpty()) {
		const [cost, r, c, dr, dc] = queue.dequeue()
		seen.add(stringify(r, c, dr, dc))
		if (maze[r][c] === "E") {
			return cost
		}
		const options: OhGod[] = [
			[cost + 1, r + dr, c + dc, dr, dc],
			[cost + 1000, r, c, dc, -dr],
			[cost + 1000, r, c, -dc, dr],
		]
		for (const [ncost, nr, nc, ndr, ndc] of options) {
			if (maze[nr][nc] === "#" || seen.has(stringify(nr, nc, ndr, ndc))) {
				continue
			}
			queue.enqueue([ncost, nr, nc, ndr, ndc])
		}
	}
	throw Error("shit")
}

function stringify(v1: number, v2: number, v3: number, v4: number) {
	return `${v1},${v2},${v3},${v4}`
}
