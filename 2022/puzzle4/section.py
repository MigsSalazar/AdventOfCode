
fileIn = open('input.txt')

count = 0

for lines in fileIn:
	elves = lines.strip().split(',')
	elf1Sec = elves[0].split('-')
	elf2Sec = elves[1].split('-')
	elf1Range = set(range(int(elf1Sec[0]), int(elf1Sec[1])+1))
	elf2Range = set(range(int(elf2Sec[0]), int(elf2Sec[1])+1))
	if elf1Range.issubset(elf2Range) or elf1Range.issuperset(elf2Range):
		count += 1

print(count)