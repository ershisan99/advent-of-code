export function day5(input: string) {
	let result = 0;

	const [rulesStr, updatesStr] = input.split("\n\n");

	const rules = rulesStr.split("\n").map((x) => x.split("|"));
	const updates = updatesStr.split("\n").map((x) => x.split(","));

	for (const update of updates) {
		let isValid = true;
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i];
			const x = rule[0];
			const y = rule[1];
			const xIndex = update.indexOf(x);
			const yIndex = update.indexOf(y);
			if (xIndex === -1 || yIndex === -1) {
				continue;
			}
			if (yIndex < xIndex) {
				console.log("not valid", {
					x,
					y,
					xIndex,
					yIndex,
					update,
				});
				isValid = false;
				break;
			}
		}

		if (isValid) {
			const middleValue = update[Math.floor(update.length / 2)];
			result += Number.parseInt(middleValue);
		}
	}

	return result;
}

export function day5part2(input: string) {
	let result = 0;

	const [rulesStr, updatesStr] = input.split("\n\n");

	const rules = rulesStr.split("\n").map((x) => x.split("|"));
	const updates = updatesStr.split("\n").map((x) => x.split(","));

	const invalidUpdates = [];
	for (const update of updates) {
		let isValid = true;
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i];
			const x = rule[0];
			const y = rule[1];
			const xIndex = update.indexOf(x);
			const yIndex = update.indexOf(y);
			if (xIndex === -1 || yIndex === -1) {
				continue;
			}
			if (yIndex < xIndex) {
				isValid = false;
				break;
			}
		}

		if (!isValid) {
			invalidUpdates.push(update);
		}
	}

	for (const update of invalidUpdates) {
		update.sort((a, b) => {
			const rule = rules.find((v) => v.includes(a) && v.includes(b));
			if (!rule) {
				return 0;
			}
			if (rule[0] === a) {
				return -1;
			}
			return 1;
		});
		const middleValue = update[Math.floor(update.length / 2)];
		result += Number.parseInt(middleValue);
	}

	return result;
}
