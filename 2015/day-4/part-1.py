import os
import hashlib

file_path = os.path.join(os.path.dirname(__file__), "./input.txt")
# file_path = os.path.join(os.path.dirname(__file__), "./test-input.txt")
input = open(file_path).read().strip()


number = 0
while True:
    result = hashlib.md5((input + str(number)).encode()).hexdigest()
    if result.startswith("00000"):
        print(number)
        break
    number += 1
