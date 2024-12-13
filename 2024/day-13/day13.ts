const TOKENS_PER_PUSH_A = 3;
const TOKENS_PER_PUSH_B = 1;

export function part1(input: string) {
	const configs = parseInput(input);
	return solve(configs);
}

export function part2(input: string) {
	const configs = parseInput(input).map((o) => {
		return {
			...o,
			prize: o.prize.map((x) => x + 10000000000000),
		};
	});
	return solve(configs);
}

function solve(parsed: ReturnType<typeof parseInput>) {
	let final = 0;
	parsed.forEach((config) => {
		const options = findOptions(config);
		if (options.length === 0) {
			return;
		}
		final += options[0] * TOKENS_PER_PUSH_A + options[1] * TOKENS_PER_PUSH_B;
	});
	return final;
}

function findOptions(config: ReturnType<typeof parseInput>[number]) {
	const [ax, ay] = config.buttonA;
	const [bx, by] = config.buttonB;
	const [gx, gy] = config.prize;
	const ca = (gx * by - gy * bx) / (ax * by - ay * bx);
	if (!isInt(ca)) return [];
	return [ca, (gx - ca * ax) / bx];
}

function parseInput(input: string) {
	const parts = input.split("\n\n");

	return parts.map((part) => {
		const [partA, partB, partResult] = part.split("\n");
		const buttonA = partA
			.replace("Button A: ", "")
			.replace("X+", "")
			.replace(" Y+", "")
			.split(",")
			.map(Number);
		const buttonB = partB
			.replace("Button B: ", "")
			.replace("X+", "")
			.replace(" Y+", "")
			.split(",")
			.map(Number);
		const prize = partResult
			.replace("Prize: ", "")
			.replace("X=", "")
			.replace(" Y=", "")
			.split(",")
			.map(Number);
		return { buttonA, buttonB, prize };
	});
}

function isInt(number: number) {
	return number % 1 === 0;
}
