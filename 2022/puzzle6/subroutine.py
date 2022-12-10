
fileIn = open('input.txt')

value = fileIn.readline().strip()

for idx in range(4, len(value)):
	if len(set(value[idx-4:idx])) == 4:
		print('index: ' + str(idx))
		break