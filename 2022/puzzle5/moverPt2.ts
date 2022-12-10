import * as fs from 'fs';

const file = fs.readFileSync('input.txt','utf8');

const lines = file.split('\n');

const regex = / ([0-9]   )+[0-9] /;
let numLine: string = '';
let matches: RegExpMatchArray | null = null;
let i=0;
for(i; i < lines.length; i++){
	numLine = lines[i];
	//console.log(numLine);
	matches = numLine.match(regex);
	if(matches !== null) break;
}

const stacks: {[stack: number]: string[]} = {};

const stackNums = numLine.split(" ")
	.filter(val => val.trim() !== "")
	.map(n => +n);

stackNums.forEach(stack => stacks[stack] = []);

const boxRegex = /\[(?<crateName>\w)\] ?/;

for(let j=0; j<i; j++){
	const curLine = lines[j];
	stackNums.forEach(stackNum => {
		const idx = (stackNum - 1) * 4;
		const subStr = curLine.substring(idx, idx + 4);
		if(subStr.trim() !== ""){
			const match = subStr.match(boxRegex);
			const name = match!.groups!['crateName'];
			stacks[stackNum].unshift(name);
		}
	})
}

const moveRegex = /move (?<quantity>[0-9]+) from (?<fromStack>[0-9]+) to (?<toStack>[0-9]+)/

for(let l = i+1; l < lines.length; l++){
	const curLine = lines[l];
	if(curLine.trim() !== ""){
		const match = curLine.match(moveRegex);
		const {quantity, fromStack, toStack} = match!.groups!;
		const quant = +quantity;
		const fStack = stacks[+fromStack];
		const tStack = stacks[+toStack];
		const craneArm: string[] = [];
		for(let q=0; q<quant; q++){
			craneArm.unshift(fStack.pop()!);
		}
		stacks[+toStack] = tStack.concat(craneArm);
	}
}
let result = stackNums.reduce((str, stack) => {
	return str + stacks[stack].pop()!;
}, "");

console.log(result);

