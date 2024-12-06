import math
import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
input = open(file_path).read().strip()

count = 0

for line in input.splitlines():
    dimensions = sorted(map(int, line.split("x")))
    [x, y, z] = dimensions

    perimiter = (x + y) * 2
    volume = math.prod(dimensions)

    count += perimiter + volume

print(count)
