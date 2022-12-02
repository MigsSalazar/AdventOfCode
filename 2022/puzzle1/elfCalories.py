# To hell with your snake case. I'm using lower camel case

fileIn = open("input.txt")

curMax = 0
sum = 0

for line in fileIn:
	if line == "\n":
		curMax = max(sum, curMax)
		sum = 0
	else:
		numberized = int(line)
		sum += numberized

print(curMax)