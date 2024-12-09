export function part1(input: string) {
	const lines = input.split("\n");
	const line = lines[0];
	const diskMap = line.split("").map(Number);

	const breakdown = diskMap
		.map((e, i) => {
			if (i % 2 === 0) {
				return {
					type: "file",
					id: i / 2,
					count: e,
				};
			}
			return {
				type: "free",
				count: e,
			};
		})
		.filter((e) => e.count !== 0);

	while (true) {
		const lastFileIndex = breakdown.findLastIndex((v) => v.type === "file");
		const lastFile = breakdown[lastFileIndex];

		const firstFreeSpaceIndex = breakdown.findIndex((v) => v.type === "free");
		const firstFreeSpace = breakdown[firstFreeSpaceIndex];

		if (!firstFreeSpace || !lastFile) {
			break;
		}

		if (lastFile.count < firstFreeSpace.count) {
			const diff = firstFreeSpace.count - lastFile.count;
			breakdown.splice(firstFreeSpaceIndex, 0, {
				...lastFile,
			});
			firstFreeSpace.count = diff;
			breakdown.splice(lastFileIndex + 1, 1);
		} else if (lastFile.count > firstFreeSpace.count) {
			const diff = lastFile.count - firstFreeSpace.count;

			breakdown.splice(firstFreeSpaceIndex, 1, {
				...lastFile,
				count: firstFreeSpace.count,
			});
			lastFile.count = diff;
		} else if (lastFile.count === firstFreeSpace.count) {
			breakdown.splice(firstFreeSpaceIndex, 1, {
				...lastFile,
			});
			breakdown.splice(lastFileIndex, 1);
		}

		// const x = [];
		// for (const v of breakdown) {
		// 	x.push((v.id ?? ".").toString().repeat(v.count));
		// }
		// console.log(x.join(""));
	}
	// console.log(breakdown.filter((v) => v.count !== 0));
	let indexCount = 0;
	let final = 0;
	for (const b of breakdown) {
		for (let i = 0; i < b.count; i++) {
			final += indexCount * b.id;
			indexCount++;
		}
	}
	return final;
}

export function part2(input: string) {
	const lines = input.split("\n");
	const line = lines[0];
	const diskMap = line.split("").map(Number);

	const breakdown = diskMap
		.map((e, i) => {
			if (i % 2 === 0) {
				return {
					type: "file",
					id: i / 2,
					count: e,
				};
			}
			return {
				type: "free",
				count: e,
			};
		})
		.filter((e) => e.count !== 0);
	const files = breakdown
		.filter((v) => v.type === "file")
		.sort((a, b) => b.id - a.id);
	for (let i1 = 0; i1 < files.length; i1++) {
		const file = files[i1];
		const fileIndex = breakdown.findIndex((v) => v.id === file.id);
		const fileInBreakdown = breakdown[fileIndex];

		const firstFreeSpaceIndex = breakdown.findIndex(
			(v, i) =>
				v.type === "free" && i < fileIndex && v.count >= fileInBreakdown?.count,
		);

		const firstFreeSpace = breakdown[firstFreeSpaceIndex];

		if (!firstFreeSpace || !fileInBreakdown) {
			continue;
		}

		if (fileInBreakdown.count < firstFreeSpace.count) {
			const diff = firstFreeSpace.count - fileInBreakdown.count;
			breakdown.splice(firstFreeSpaceIndex, 0, {
				...fileInBreakdown,
			});
			firstFreeSpace.count = diff;
			fileInBreakdown.type = "free";
			fileInBreakdown.id = undefined;
		} else if (fileInBreakdown.count === firstFreeSpace.count) {
			breakdown.splice(firstFreeSpaceIndex, 1, {
				...fileInBreakdown,
			});
			fileInBreakdown.type = "free";
			fileInBreakdown.id = undefined;
		}

		// const x = [];
		// for (const v of breakdown) {
		// 	x.push((v.id ?? ".").toString().repeat(v.count));
		// }
		// console.log(x.join(""));
	}
	let indexCount = 0;
	let final = 0;
	for (const b of breakdown) {
		for (let i = 0; i < b.count; i++) {
			if (!b.id) {
				indexCount++;
				continue;
			}
			final += indexCount * b.id;
			indexCount++;
		}
	}
	return final;
}
