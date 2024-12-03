import * as R from "remeda";

const regex = new RegExp(/mul\((\d{1,3},\d{1,3}?)\)/g);

export function day3(input: string) {
	const matches = input.matchAll(regex);
	const numberPairs = [];
	for (const match of matches) {
		numberPairs.push(match[1].split(",").map((v) => Number.parseInt(v, 10)));
	}
	return R.pipe(
		numberPairs,
		R.map(([a, b]) => a * b),
		R.sum,
	) as unknown as number;
}

export function day3part2(input: string) {
	const parts = input.split("do()");
	return R.sum(
		parts.map((part) => {
			const [toDo] = part.split("don't()");
			return day3(toDo);
		}),
	);
}
