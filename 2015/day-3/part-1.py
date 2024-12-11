import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
# file_path = os.path.join(os.path.dirname(__file__), "./test-input.txt")
input = open(file_path).read().strip()


def next_coordinates(current, symbol):
    if symbol == "^":
        return (current[0] - 1, current[1])
    if symbol == "v":
        return (current[0] + 1, current[1])
    if symbol == ">":
        return (current[0], current[1] + 1)
    if symbol == "<":
        return (current[0], current[1] - 1)


count = 0
visited = {(0, 0)}

x = 0
y = 0
for dir in list(input):
    next = next_coordinates((x, y), dir)
    x = next[0]
    y = next[1]
    visited.add(next)
    print(next)

print(len(visited))
