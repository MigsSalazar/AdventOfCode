import * as fs from 'fs';

interface TreeScores {
	top: number;
	bottom: number;
	left: number;
	right: number;
}
//I would love to optimize this garbage, but idk what the hell to do otherwise
const file = fs.readFileSync('input.txt','utf8');
const lines = file.split('\n').map(line => line.trim());

const trees = lines.map(line => line.split("").map(char => +char));

const height = lines.length;
const width = lines[0].length;

const scores: TreeScores[][] = [];
for(let w = 0; w < width; w++){
	scores.push([]);
	for(let h = 0; h < height; h++){
		scores[w].push({
			top: -1,
			bottom: -1,
			left: -1,
			right: -1
		})
	}
}

function leftCheck(row: number, col: number){
	if(col === 0){
		scores[row][col].left = 0;
	}
	let check = col;
	do{
		check--;
	}while(check > 0 && trees[row][col] > trees[row][check]);

	scores[row][col].left = col - check;
}

function rightCheck(row: number, col: number){
	if(col === trees[row].length - 1){
		scores[row][col].right = 0;
	}
	let check = col;
	do{
		check++;
	}while(check < trees[row].length - 1 && trees[row][col] > trees[row][check]);

	scores[row][col].right = check - col;
}

function topCheck(row: number, col: number){
	if(row === 0){
		scores[row][col].top = 0;
	}
	let check = row;
	do{
		check--;
	}while(check > 0 && trees[row][col] > trees[check][col]);

	scores[row][col].top = row - check;
}

function bottomCheck(row: number, col: number){
	if(row === trees.length - 1){
		scores[row][col].bottom = 0;
	}
	let check = row;
	do{
		check++;
	}while(check < trees.length - 1 && trees[row][col] > trees[check][col]);

	scores[row][col].bottom = check - row;
	
}

function calcTreeScore(score: TreeScores){
	const {top, bottom, left, right} = score;
	return top * bottom * left * right;
}

let lastMax = 0;

scores.forEach((rowList, row) => rowList.forEach((scores, col) => {
	rightCheck(row, col);
	leftCheck(row, col);
	topCheck(row, col);
	bottomCheck(row, col);
	const myMax = calcTreeScore(scores);
	
	lastMax = Math.max(myMax, lastMax);
}));

console.log(`max:${lastMax}`);