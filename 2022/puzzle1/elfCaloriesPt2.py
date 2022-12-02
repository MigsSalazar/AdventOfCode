# To hell with your snake case. I'm using lower camel case

fileIn = open("input.txt")

maxes = []
sum = 0

for line in fileIn:
	if line == "\n":
		maxes.append(sum)
		# if(len(maxes) >= 3):
		#	maxes.sort(reverse=True)
		#	maxes = maxes[:3]
		sum = 0
	else:
		numberized = int(line)
		sum += numberized

print(maxes)

maxes.sort(reverse = True)

print(maxes)

top3 = maxes[:3]
print(top3)

newSum = 0
for num in top3:
	newSum += num
print(newSum)