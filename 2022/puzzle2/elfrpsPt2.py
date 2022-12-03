

fileIn = open("input.txt")

# A = Rock
# B = Paper
# C = Scissors

# X = lose
# Y = draw
# Z = win

resultMap = {
	"A": {
		"X": 3,
		"Y": 1,
		"Z": 2
	},
	"B": {
		"X": 1,
		"Y": 2,
		"Z": 3
	},
	"C": {
		"X": 2,
		"Y": 3,
		"Z": 1
	}
}
myPick = {
	"X": 0,
	"Y": 3,
	"Z": 6
}

sum = 0

for line in fileIn:
	picks = line.strip().split(' ')
	sum += resultMap[picks[0]][picks[1]] + myPick[picks[1]]

print(sum)