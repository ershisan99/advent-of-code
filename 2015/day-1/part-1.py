import os

script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in
rel_path = "./input.txt"
abs_file_path = os.path.join(script_dir, rel_path)

input = open(abs_file_path).read()

count = 0
for i, char in enumerate(list(input), start=1):
    if char == "(":
        count += 1
    else:
        count -= 1
print(count)
