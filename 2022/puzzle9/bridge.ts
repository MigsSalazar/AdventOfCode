import * as fs from 'fs';

const file = fs.readFileSync('input.txt','utf8');

const lines = file.split('\n').map(line => line.trim()).filter(line => line !== "");

const moveRegex = /(?<direction>[UDLR]) (?<magnitude>\d+)/

enum Direction {
	Up,
	Down,
	Left, 
	Right,
	UpRight,
	UpLeft,
	DownRight,
	DownLeft
}

type DirKey = keyof typeof Direction;

interface Vector {
	direction: Direction;
	magnitude: number;
}

interface Coord {
	horiz: number;
	vert: number;
}

function getDirection(char: string): Direction{
	switch(char){
		case 'U': return Direction.Up;
		case 'D': return Direction.Down;
		case 'L': return Direction.Left;
		case 'R': return Direction.Right;
		default: throw new Error(`bad direction char:${char}`)
	}
}

function getVector(line: string): Vector | null{
	const matches = line.match(moveRegex);
	if(matches && matches.groups && matches.groups['direction'] && matches.groups['magnitude']){
		return {
			direction: getDirection(matches.groups['direction']),
			magnitude: +matches.groups['magnitude']
		}
	}
	return null;
}

const head: Coord = {
	horiz: 0,
	vert: 0
}

const tail: Coord = {
	horiz: 0,
	vert: 0
}

const visitedCords = new Set<string>(['0,0']);

function moveCoord(coord: Coord, dir: Direction){
	switch(dir){
		case Direction.Up:
			coord.vert++;
			break;
		case Direction.UpRight:
			coord.vert++;
			coord.horiz++;
			break;
		case Direction.UpLeft:
			coord.vert++;
			coord.horiz--;
			break;
		case Direction.Down:
			coord.vert--;
			break;
		case Direction.DownRight:
			coord.vert--;
			coord.horiz++;
			break;
		case Direction.DownLeft:
			coord.vert--;
			coord.horiz--;
			break;
		case Direction.Left:
			coord.horiz--;
			break;
		case Direction.Right:
			coord.horiz++;
			break;
		default: throw new Error('fix your code')
	}
}

function moveHead(line: string){
	const vector = getVector(line);
	if(vector){
		for(let _ = 0; _ < vector.magnitude; _++){
			moveCoord(head, vector.direction);
			const horizDiff = head.horiz - tail.horiz;
			const vertDiff = head.vert - tail.vert;
			const horizAbs = Math.abs(horizDiff);
			const vertAbs = Math.abs(vertDiff);
			if(horizAbs > 1 || vertAbs > 1){
				if(horizAbs !== 0 && vertAbs !== 0){
					let horizMove = '';
					let vertMove = '';
					if(horizDiff < 0){
						horizMove = 'Left'
					}else{
						horizMove = 'Right'
					}
					if(vertDiff < 0){
						vertMove = 'Down';
					}else{
						vertMove = 'Up';
					}

					const fullMove = vertMove + horizMove;
					moveCoord(tail, Direction[fullMove as DirKey]);
				}else{
					let move = '';
					if(horizAbs !== 0){
						if(horizDiff < 0){
							move = 'Left'
						}else{
							move = 'Right'
						}
					}else{
						if(vertDiff < 0){
							move = 'Down';
						}else{
							move = 'Up';
						}
					}
					moveCoord(tail, Direction[move as DirKey]);
				}
				visitedCords.add(`${tail.horiz},${tail.vert}`);
			}
		}
	}
}

lines.forEach(moveHead)

console.log(visitedCords.size)