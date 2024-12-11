import os
import re

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
# file_path = os.path.join(os.path.dirname(__file__), "./test-input.txt")
input = open(file_path).read().strip()
lines = input.split("\n")

count = 0

for line in lines:
    if not any(
        [
            len(re.findall(pair, line)) >= 2
            for pair in {line[i] + line[i + 1] for i in range(len(line) - 1)}
        ]
    ) or not any([line[i + 2] == line[i] for i in range(len(line) - 2)]):
        continue

    count += 1

print(count)
