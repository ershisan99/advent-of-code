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
    [l, w, h] = dimensions

    perimiter = l * 2 + w * 2
    volume = l * w * h
    count += perimiter + volume
print(count)

# 48
