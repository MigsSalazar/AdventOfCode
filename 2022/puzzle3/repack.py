import string
fileIn = open('input.txt')

letters = list(string.ascii_lowercase) + list(string.ascii_uppercase)
letterDict = {}

for i in range(len(letters)): 
	letterDict[letters[i]] = i+1

sum = 0

for line in fileIn:
	trimmed = line.strip()
	halfIdx = int(len(trimmed) / 2)
	rucksack = set(list(trimmed[:halfIdx]))
	second = set(list(trimmed[halfIdx:]))
	sharedChar = list(rucksack.intersection(second))
	sum += letterDict[sharedChar[0]]

print(sum)