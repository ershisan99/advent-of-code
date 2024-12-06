import os

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
input = open(file_path).read().strip()

result = input.count("(") - input.count(")")
print(result)
