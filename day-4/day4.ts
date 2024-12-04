export function day4(input: string) {
	const lines = input.split("\n");
	const splitLines = lines.map((line) => line.split(""));
	const columns: string[] = [];
	const diagonals: string[] = [];
	for (let j = 0; j < lines.length; j++) {
		const chars = [];
		for (let i = 0; i < lines.length; i++) {
			if (i + j >= lines.length) break;
			chars.push(lines[i].charAt(i + j));
		}
		diagonals.push(chars.join(""));
	}
	for (let j = 1; j < lines.length; j++) {
		const chars = [];
		for (let i = 0; i < lines.length; i++) {
			if (i + j >= lines.length) break;
			chars.push(lines[i + j].charAt(i));
		}
		diagonals.push(chars.join(""));
	}

	// Prlet diagonally right top to left bottom diagonal
	for (let j = 0; j < lines.length; j++) {
		const chars = [];

		for (let i = j; i >= 0; i--) {
			chars.push(lines[j - i].charAt(i));
		}
		diagonals.push(chars.join(""));
	}
	for (let j = 1; j < lines.length; j++) {
		const chars = [];

		for (let i = j; i < lines.length; i++) {
			chars.push(lines[lines.length - i + j - 1].charAt(i));
		}
		diagonals.push(chars.join(""));
	}

	for (let i = 0; i < splitLines[0].length; i++) {
		const word: string[] = [];
		for (let j = 0; j < lines.length; j++) {
			word.push(splitLines[j][i]);
		}
		columns.push(word.join(""));
	}

	let count = 0;

	for (const line of lines) {
		const matches = line.match(/(?=(XMAS|SAMX))/g);
		if (matches === null) continue;
		count += matches.length;
	}

	for (const col of columns) {
		const matches = col.match(/(?=(XMAS|SAMX))/g);
		if (matches === null) continue;
		count += matches.length;
	}

	for (const d of diagonals) {
		const matches = d.match(/(?=(XMAS|SAMX))/g);
		if (matches === null) continue;
		count += matches.length;
	}

	return count;
}

export function day4part2(input: string) {
	const lines = input.split("\n");
	const splitLines = lines.map((line) => line.split(""));

	const coordinates = [];
	for (let i = 1; i < lines.length - 1; i++) {
		const line = lines[i];
		const chars = line.split("");
		for (let i1 = 1; i1 < chars.length - 1; i1++) {
			const char = chars[i1];
			if (char !== "A") continue;
			coordinates.push([i, i1]);
		}
	}
	let count = 0;

	for (const c of coordinates) {
		const [x, y] = c;
		const leftTopChar = splitLines[x - 1][y - 1];
		const rightTopChar = splitLines[x + 1][y - 1];

		const leftBottomChar = splitLines[x - 1][y + 1];
		const rightBottomChar = splitLines[x + 1][y + 1];
		if (!["S", "M"].includes(leftTopChar)) {
			continue;
		}
		if (!["S", "M"].includes(rightTopChar)) {
			continue;
		}
		if (!["S", "M"].includes(leftBottomChar)) {
			continue;
		}
		if (!["S", "M"].includes(rightBottomChar)) {
			continue;
		}

		if (leftTopChar === rightBottomChar) {
			continue;
		}
		if (leftBottomChar === rightTopChar) {
			continue;
		}

		console.log(x, y);
		count++;
	}
	console.log(count);
	return count;
}
