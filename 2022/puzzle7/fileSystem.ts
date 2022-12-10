import * as fs from 'fs';

interface Directory {
	name: string;
	parentDir: Directory | null;
	pwd: string[];
	files: {[name: string]: number};
	dirs: {[name: string]: Directory};
}

function cmdLs(lines: string[], index: number, curDir: Directory){
	const subDirPwd = [...curDir.pwd, curDir.name]
	let idx = index;
	while(idx < lines.length && !lines[idx].startsWith("$")){
		const line = lines[idx].trim();
		if(line !== ""){
			const metadata = line.split(" ");
			if(metadata[0] === "dir"){
				curDir.dirs[metadata[1]] = {
					name: metadata[1],
					parentDir: curDir,
					pwd: subDirPwd,
					files: {},
					dirs: {}
				}
			}else if(!isNaN(+metadata[0])){
				curDir.files[metadata[1]] = +metadata[0];
			}
		}
		
		idx++;
	}
	return idx;
}

const getSizeIdx = (dir: Directory) => [...dir.pwd, dir.name].join("/");

function recCalcFolderSize(subRoot: Directory, sizes: {[dirName: string]: number}): number{
	let sum = Object.values(subRoot.files).reduce((prev, cur) => cur + prev, 0);
	Object.values(subRoot.dirs).forEach((dir) => {
		sum += recCalcFolderSize(dir, sizes);
	})
	sizes[getSizeIdx(subRoot)] = sum;
	return sum;
}

function printFileSystem(subRoot: Directory, sizes: {[name: string]: number}){
	const path = subRoot.pwd.map(part => '-');
	console.log([...path, subRoot.name, `(dir, sum=${sizes[getSizeIdx(subRoot)]})`].join(" "));
	Object.values(subRoot.dirs).forEach(dir => printFileSystem(dir, sizes));
	Object.entries(subRoot.files).forEach(file => console.log([...path, `- ${file[0]} (file, size=${file[1]})`].join(" ")))
}

const file = fs.readFileSync('input.txt','utf8');

const lines = file.split('\n');

const homeDir: Directory = {
	name: '/',
	parentDir: null,
	pwd: [],
	files: {},
	dirs: {}
}

let curDirectory: Directory = homeDir;
let index: number = 0;

while(index < lines.length && lines[index].trim() !== ""){
	const line = lines[index].trim();
	if(line.startsWith("$ cd")){
		if(line === "$ cd /"){
			curDirectory = homeDir;
		}else if(line === "$ cd .."){
			if(curDirectory.parentDir)
				curDirectory = curDirectory.parentDir;
			else
				throw new Error("Can't go above the home dir")
		}else{
			const dirName = line.split(" ")[2];
			if(curDirectory.dirs[dirName])
				curDirectory = curDirectory.dirs[dirName];
			else
				throw new Error(`Cannot find directory "${dirName}"`);
		}
		index++;
	}else if(line === "$ ls"){
		index = cmdLs(lines, index+1, curDirectory);
	}
}


const sizes: {[name: string]: number} = {};
recCalcFolderSize(homeDir, sizes);
printFileSystem(homeDir, sizes);

const validSizes = Object.keys(sizes)
	.filter(dirName => sizes[dirName] <= 100000)
	.reduce((obj, dirName) => {
		obj[dirName] = sizes[dirName]
		return obj;
	}, {} as typeof sizes);

// console.log(validSizes)

const result = Object.values(validSizes).reduce((prev, cur) => prev + cur, 0);

console.log(`result: ${result}`);