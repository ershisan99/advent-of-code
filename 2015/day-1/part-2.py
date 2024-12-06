input = open("input.txt").read()
count = 0
for i, char in enumerate(list(input), start=1):
    if char == "(":
        count += 1
    else:
        if count == 0:
            print(i)
            break
        count -= 1
