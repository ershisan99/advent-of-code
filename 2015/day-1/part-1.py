import os

abs_file_path = os.path.join(os.path.dirname(__file__), "./input.txt")

input = open(abs_file_path).read().strip()

result = input.count("(") - input.count(")")

print(result)
