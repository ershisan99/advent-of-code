export function day7(input: string) {
	const lines = input.split("\n");
	let final = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const [resultStr, numbersStr] = line.split(":");
		const numbers = numbersStr.trim().split(" ").map(Number);

		const result = Number(resultStr);
		final += count(numbers, result);
	}
	return final;
}

function count(numbers: number[], expectedResult: number): number {
	if (numbers.length === 1) {
		if (numbers[0] === expectedResult) {
			return expectedResult;
		}
		return 0;
	}
	const multiplied = numbers[0] * numbers[1];
	const sumed = numbers[0] + numbers[1];

	return (
		count(numbers.toSpliced(0, 2, multiplied), expectedResult) ||
		count(numbers.toSpliced(0, 2, sumed), expectedResult)
	);
}

function count2(numbers: number[], expectedResult: number): number {
	if (numbers.length === 1) {
		if (numbers[0] === expectedResult) {
			return expectedResult;
		}
		return 0;
	}
	const multiplied = numbers[0] * numbers[1];
	const sumed = numbers[0] + numbers[1];
	const concated = Number.parseInt(
		numbers[0].toString() + numbers[1].toString(),
		10,
	);

	return (
		count2(numbers.toSpliced(0, 2, multiplied), expectedResult) ||
		count2(numbers.toSpliced(0, 2, sumed), expectedResult) ||
		count2(numbers.toSpliced(0, 2, concated), expectedResult)
	);
}

export function day7part2(input: string) {
	const lines = input.split("\n");
	let final = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const [resultStr, numbersStr] = line.split(":");
		const numbers = numbersStr.trim().split(" ").map(Number);

		const result = Number(resultStr);
		final += count2(numbers, result);
	}
	return final;
}
