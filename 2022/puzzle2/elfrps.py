

fileIn = open("input.txt")

# A,X = Rock
# B,Y = Paper
# C,Z = Scissors

resultMap = {
	"A": {
		"X": 3,
		"Y": 6,
		"Z": 0
	},
	"B": {
		"X": 0,
		"Y": 3,
		"Z": 6
	},
	"C": {
		"X": 6,
		"Y": 0,
		"Z": 3
	}
}
myPick = {
	"X": 1,
	"Y": 2,
	"Z": 3
}

sum = 0

for line in fileIn:
	picks = line.strip().split(' ')
	sum += resultMap[picks[0]][picks[1]] + myPick[picks[1]]

print(sum)