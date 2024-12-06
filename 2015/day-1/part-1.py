input = open("input.txt").read()
count = 0
for i, char in enumerate(list(input), start=1):
    if char == "(":
        count += 1
    else:
        count -= 1
print(count)
