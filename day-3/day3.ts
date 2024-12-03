import * as R from "remeda";

const regex = new RegExp(/mul\((\d{1,3},\d{1,3}?)\)/g);

export function day3(input: string) {
	return R.sum(
		input
			.matchAll(regex)
			.map((match) => {
				// match[1] looks like "2,4"
				const [a, b] = match[1].split(",").map((v) => Number.parseInt(v, 10));
				return a * b;
			})
			.toArray(),
	);
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
