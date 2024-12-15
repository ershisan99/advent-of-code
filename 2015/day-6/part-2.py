from collections import defaultdict
import os
import re

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
# file_path = os.path.join(os.path.dirname(__file__), "./test-input.txt")
input = open(file_path).read().strip()
lines = input.split("\n")

lights = defaultdict(int)
for line in lines:
    match = re.findall(r"(.*?)(\d*,\d*) through (\d*,\d*)", line)
    if not match:
        continue
    instruction, start, end = match[0]
    instruction = instruction.strip()
    start = tuple(map(int, start.split(",")))
    end = tuple(map(int, end.split(",")))
    for i in range(start[0], end[0] + 1):
        for j in range(start[1], end[1] + 1):
            if instruction == "turn on":
                lights[(i, j)] += 1
            elif instruction == "turn off":
                if lights[(i, j)] == 0:
                    continue
                else:
                    lights[(i, j)] -= 1
            else:
                lights[(i, j)] += 2

print(sum(lights.values()))
