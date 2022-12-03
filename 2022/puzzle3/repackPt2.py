import string
fileIn = open('input.txt')

letters = list(string.ascii_lowercase) + list(string.ascii_uppercase)
letterDict = {}

for i in range(len(letters)): 
	letterDict[letters[i]] = i+1

lineCount = 0
sum = 0
curSet = set()

for lines in fileIn:
	newSet = set(list(lines.strip()))
	if lineCount == 0:
		curSet = newSet
	else:
		curSet = curSet.intersection(newSet)
	if lineCount == 2:
		sum += letterDict[ list(curSet)[0] ]
		lineCount = 0
		curSet = set()
	else:
		lineCount += 1


print(sum)