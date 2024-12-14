export function part1(input: string, width: number, height: number) {
	const parsedInput = parseInput(input)
	const positions = []
	const quadrants = getQuadrants(width, height)
	for (const robot of parsedInput) {
		let pos = robot[0]
		const velocity = robot[1]
		for (let i = 0; i < 100; i++) {
			pos = calculateNextPosition(pos, velocity, width, height)
		}
		positions.push(pos)
	}
	return getSafetyFactor(positions, quadrants)
}

function getSafetyFactor(
	positions: [number, number][],
	quadrants: ReturnType<typeof getQuadrants>,
) {
	let tr = 0
	let tl = 0
	let br = 0
	let bl = 0

	for (const position of positions) {
		const res = determineQuadrant(position, quadrants)
		switch (res) {
			case "tr":
				tr++
				break
			case "tl":
				tl++
				break
			case "br":
				br++
				break
			case "bl":
				bl++
				break
			default:
				break
		}
	}

	return tr * tl * br * bl
}

export function part2(input: string, width: number, height: number) {
	const parsedInput = parseInput(input)
	const quadrants = getQuadrants(width, height)
	let minsf = Number.POSITIVE_INFINITY
	let best = 0
	let bestPositions = []

	let positions = parsedInput.map((x) => x[0])
	for (let i = 0; i < width * height; i++) {
		const currentPositions = []
		for (let i1 = 0; i1 < parsedInput.length; i1++) {
			const robot = parsedInput[i1]
			const pos = positions[i1]
			const velocity = robot[1]
			const newPos = calculateNextPosition(pos, velocity, width, height)
			currentPositions.push(newPos)
		}
		positions = currentPositions
		const sf = getSafetyFactor(positions, quadrants)
		if (sf < minsf) {
			minsf = sf
			best = i + 1
			bestPositions = positions
		}
	}
	display(bestPositions, width, height)
	return best
}

function parseInput(input: string) {
	const lines = input.split("\n")
	return lines.map((line) => {
		return line
			.replaceAll("p=", "")
			.replaceAll("v=", "")
			.trim()
			.split(" ")
			.map((x) => x.split(",").map(Number))
	}) as [number, number][][]
}

export function calculateNextPosition(
	currentPosition: [number, number],
	velocity: [number, number],
	width: number,
	height: number,
) {
	const [cx, cy] = currentPosition
	const [vx, vy] = velocity

	let nx = cx + vx
	let ny = cy + vy
	if (ny < 0) {
		ny = height + ny
	}
	if (ny >= height) {
		ny = ny - height
	}
	if (nx < 0) {
		nx = width + nx
	}
	if (nx >= width) {
		nx = nx - width
	}
	return [nx, ny] as [number, number]
}

function getQuadrants(width: number, height: number) {
	const tl = {
		fx: 0,
		fy: 0,
		tx: Math.floor(width / 2) - 1,
		ty: Math.floor(height / 2) - 1,
	}
	const tr = {
		fx: Math.ceil(width / 2),
		fy: 0,
		tx: width - 1,
		ty: Math.floor(height / 2) - 1,
	}
	const bl = {
		fx: 0,
		fy: Math.ceil(height / 2),
		tx: Math.floor(width / 2) - 1,
		ty: height - 1,
	}
	const br = {
		fx: Math.ceil(width / 2),
		fy: Math.ceil(height / 2),
		tx: width - 1,
		ty: height - 1,
	}
	return { tl, tr, bl, br }
}

function determineQuadrant(
	[x, y]: [number, number],
	{ tr, tl, br, bl }: ReturnType<typeof getQuadrants>,
) {
	if (x >= tr.fx && x <= tr.tx) {
		if (y >= tr.fy && y <= tr.ty) {
			return "tr"
		}
		if (y >= br.fy && y <= br.ty) {
			return "br"
		}
		return null
	}
	if (x >= tl.fx && x <= tl.tx) {
		if (y >= tl.fy && y <= tl.ty) {
			return "tl"
		}
		if (y >= bl.fy && y <= bl.ty) {
			return "bl"
		}
		return null
	}
	return null
}

function display(positions: [number, number][], width: number, height: number) {
	const grid = []
	for (let i = 0; i < height; i++) {
		const line = []
		for (let j = 0; j < width; j++) {
			if (positions.find(([x, y]) => x === j && y === i)) {
				line.push("X")
			} else line.push(".")
		}
		grid.push(line.join(""))
	}
	console.log(grid.join("\n"))
}
