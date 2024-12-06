import os

script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in
rel_path = "./input.txt"
# rel_path = "./test-input.txt"

abs_file_path = os.path.join(script_dir, rel_path)

input = open(abs_file_path).read()


count = 0
lines = input.splitlines()
for line in lines:
    dimensions = list(map(int, line.split("x")))
    dimensions.sort()
    area1 = dimensions[0] * dimensions[1] * 2
    area2 = dimensions[1] * dimensions[2] * 2
    area3 = dimensions[0] * dimensions[2] * 2
    total = area1 + area2 + area3 + int(area1 / 2)
    count += total
print(count)
