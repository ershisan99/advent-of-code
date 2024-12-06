import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
input = open(file_path).read().strip()

count = 0
for i, char in enumerate(list(input), start=1):
    if count == 0 and char == ")":
        print(i)
        break
    if char == "(":
        count += 1
    else:
        count -= 1
