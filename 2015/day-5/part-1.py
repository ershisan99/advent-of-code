import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
# file_path = os.path.join(os.path.dirname(__file__), "./test-input.txt")
input = open(file_path).read().strip()
lines = input.split("\n")
vowels = list("aeiou")
forbidden_strings = ["ab", "cd", "pq", "xy"]

count = 0

for line in lines:
    if (
        any([forbidden_string in line for forbidden_string in forbidden_strings])
        or sum([line.count(vowel) for vowel in vowels]) < 3
        or not any([line[i + 1] == line[i] for i in range(len(line) - 1)])
    ):
        continue
    count += 1

print(count)
