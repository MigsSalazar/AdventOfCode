import * as fs from 'fs';

const file = fs.readFileSync('input.txt','utf8');

const lines = file.split('\n').map(line => line.trim()).filter(line => line !== "");;