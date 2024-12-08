export function part1(input: string) {
	const lines = input.split("\n");
	const height = lines.length;
	const width = lines[0].length;
	const antennas = new Map();
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];
			if (char === ".") {
				continue;
			}
			const [x, y] = [i, j];
			if (antennas.has(char)) {
				const current = antennas.get(char);

				current.push([x, y]);
			} else {
				antennas.set(char, [[x, y]]);
			}
		}
	}

	const antinodes = [];
	for (const frequency of antennas.keys()) {
		const antennasOnFreq = antennas.get(frequency);
		for (let i = 0; i < antennasOnFreq.length; i++) {
			for (let j = i + 1; j < antennasOnFreq.length; j++) {
				const p1 = antennasOnFreq[i];
				const p2 = antennasOnFreq[j];
				const distanceX = Math.abs(p1[0] - p2[0]);
				const distanceY = Math.abs(p1[1] - p2[1]);
				const antinode1 = [];
				const antinode2 = [];

				if (p1[0] > p2[0]) {
					antinode1[0] = p1[0] + distanceX;
					antinode2[0] = p2[0] - distanceX;
				} else {
					antinode1[0] = p1[0] - distanceX;
					antinode2[0] = p2[0] + distanceX;
				}

				if (p1[1] > p2[1]) {
					antinode1[1] = p1[1] + distanceY;
					antinode2[1] = p2[1] - distanceY;
				} else {
					antinode1[1] = p1[1] - distanceY;
					antinode2[1] = p2[1] + distanceY;
				}
				if (
					!(
						antinode1[0] < 0 ||
						antinode1[0] >= height ||
						antinode1[1] < 0 ||
						antinode1[1] >= width
					)
				) {
					antinodes.push(antinode1);
				}
				if (
					!(
						antinode2[0] < 0 ||
						antinode2[0] >= height ||
						antinode2[1] < 0 ||
						antinode2[1] >= width
					)
				) {
					antinodes.push(antinode2);
				}
			}
		}
	}
	const uniqueAntinodes = [...new Set(antinodes.map((x) => x.join(",")))].map(
		(x) => x.split(","),
	);

	return uniqueAntinodes.length;
}

export function part2(input: string) {
	const lines = input.split("\n");
	const height = lines.length;
	const width = lines[0].length;
	const antennas = new Map();
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];
			if (char === ".") {
				continue;
			}
			const [x, y] = [i, j];
			if (antennas.has(char)) {
				const current = antennas.get(char);

				current.push([x, y]);
			} else {
				antennas.set(char, [[x, y]]);
			}
		}
	}

	const antinodes: [number, number][] = [];
	for (const frequency of antennas.keys()) {
		const antennasOnFreq = antennas.get(frequency);
		for (let i = 0; i < antennasOnFreq.length; i++) {
			for (let j = i + 1; j < antennasOnFreq.length; j++) {
				const p1 = antennasOnFreq[i];
				const p2 = antennasOnFreq[j];
				const distanceX = Math.abs(p1[0] - p2[0]);
				const distanceY = Math.abs(p1[1] - p2[1]);
				antinodes.push(p1, p2);
				if (p1[0] < p2[0] && p1[1] < p2[1]) {
					let nextX = p2[0];
					let nextY = p2[1];
					while (true) {
						nextX = nextX + distanceX;
						nextY = nextY + distanceY;

						if (nextX >= 0 && nextX < height && nextY >= 0 && nextY < width) {
							antinodes.push([nextX, nextY]);
						} else {
							break;
						}
					}
					let prevX = p2[0];
					let prevY = p2[1];
					while (true) {
						prevX = prevX - distanceX;
						prevY = prevY - distanceY;

						if (prevX >= 0 && prevX < height && prevY >= 0 && prevY < width) {
							antinodes.push([prevX, prevY]);
						} else {
							break;
						}
					}
				} else if (p1[0] < p2[0] && p1[1] > p2[1]) {
					let nextX = p2[0];
					let nextY = p2[1];
					while (true) {
						nextX = nextX - distanceX;
						nextY = nextY + distanceY;

						if (nextX >= 0 && nextX < height && nextY >= 0 && nextY < width) {
							antinodes.push([nextX, nextY]);
						} else {
							break;
						}
					}
					let prevX = p2[0];
					let prevY = p2[1];
					while (true) {
						prevX = prevX + distanceX;
						prevY = prevY - distanceY;

						if (prevX >= 0 && prevX < height && prevY >= 0 && prevY < width) {
							antinodes.push([prevX, prevY]);
						} else {
							break;
						}
					}
				}
			}
		}
	}
	const uniqueAntinodes = [...new Set(antinodes.map((x) => x.join(",")))].map(
		(x) => x.split(","),
	);

	// display(lines, uniqueAntinodes);

	return uniqueAntinodes.length;
}

function display(lines: string[], antinodes: string[][]) {
	const nl = lines.map((x) => x.split(""));

	for (const u of antinodes) {
		nl[u[0]][u[1]] === "." ? (nl[u[0]][u[1]] = "#") : null;
	}
	for (const x of nl) {
		console.log(x.join(""));
	}
}
