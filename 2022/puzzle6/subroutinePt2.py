
fileIn = open('input.txt')

value = fileIn.readline().strip()

for idx in range(14, len(value)):
	if len(set(value[idx-14:idx])) == 14:
		print('index: ' + str(idx))
		break