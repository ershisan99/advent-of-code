import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
input = open(file_path).read().strip()

count = 0

for line in input.splitlines():
    [x, y, z] = sorted(map(int, line.split("x")))
    areaX = x * y * 2
    areaY = y * z * 2
    areaZ = x * z * 2
    count += areaX + areaY + areaZ + x * y
print(count)
