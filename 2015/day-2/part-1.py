import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
input = open(file_path).read().strip()

count = 0

for line in input.splitlines():
    [x, y, z] = sorted(map(int, line.split("x")))

    areaX = x * y
    areaY = y * z
    areaZ = x * z

    count += (areaX + areaY + areaZ) * 2 + areaX

print(count)
