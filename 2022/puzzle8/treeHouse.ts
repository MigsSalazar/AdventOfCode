import * as fs from 'fs';

const file = fs.readFileSync('input.txt','utf8');

const lines = file.split('\n').map(line => line.trim());

const lrGrid = lines.map(line => line.split('').map(char => +char));
const tbGrid: number[][] = [];

function printDebug(line: string, leftCord: number, rightCord: number){
	console.log(line);
	if(leftCord === rightCord){
		console.log("-".repeat(leftCord) + "X");
	}else if(leftCord < rightCord){
		console.log("-".repeat(leftCord) + "\\" + "-".repeat(rightCord - leftCord - 1) + "/")
	}else{
		console.log("-".repeat(rightCord) + "/" + "-".repeat(leftCord - rightCord - 1) + "\\")
	}
}

const visibleTrees: Set<string> = new Set();

lrGrid.forEach((line, row) => {
	if(row === 0){
		line.forEach(_ => tbGrid.push([]))
	}
	let high = -1;

	line.forEach((cell, col) => {
		tbGrid[col].push(cell);
		if(cell > high){
			visibleTrees.add(`${row},${col}`);
			high = cell;
		}
	});
});

lrGrid.forEach((line, row) => {
	let high = -1;

	for(let col = line.length - 1; col >= 0; col--){
		const cell = line[col];
		if(cell > high){
			visibleTrees.add(`${row},${col}`);
			high = cell;
		}
	}
});


tbGrid.forEach((line, row) => {
	let high = -1;
	line.forEach((cell, col) => {
		if(cell > high){
			visibleTrees.add(`${col},${row}`);
			high = cell;
		}
	});
});

tbGrid.forEach((line, row) => {
	let high = -1;

	for(let col = line.length - 1; col >= 0; col--){
		const cell = line[col];
		if(cell > high){
			visibleTrees.add(`${col},${row}`);
			high = cell;
		}
	}
});


//console.log(visibleTrees)

console.log(visibleTrees.size)