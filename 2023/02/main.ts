import { getInput } from '../../utils.ts';

function getFormattedGames(inputArray: Array<string>): Map<number, Array<Map<string, string>>> {
	const splitArray = new Map<number, Array<Map<string, string>>>();
	inputArray.map((row) => {
		const splitRow = row.split(':').map((s) => s.trim());
		const key: number = parseInt(splitRow[0].split(' ')[1]);
		const valueArray: Array<string> = splitRow[1].split(';').map((s) => s.trim());
		const rounds = new Array<Map<string, string>>();
		valueArray.map((gameRound) => {
			let map = new Map<string, string>();
			gameRound.split(', ').map((s) => s.trim()).map((diceRoll) => {
				const diceRollSplit: Array<string> = diceRoll.split(' ').map((s) => s.trim());
				map.set(diceRollSplit[1], diceRollSplit[0]);
			});
			map = new Map([...map.entries()].sort());
			rounds.push(map);
		});
		splitArray.set(key, rounds);
	});
	return splitArray;
}

function checkIfGameisPossible(game: Array<Map<string, string>>): boolean {
	const gameCopy = Array.from(game);
	return gameCopy.every((value: Map<string, string>) => {
		for (const color in part1LoadedDice) {
			if (value.has(color) && parseInt(value.get(color)!) > part1LoadedDice[color]) {
				return false;
			}
		}
		return true;
	});
}

function part1(inputArray: Array<string>) {
	const formattedGames: Map<number, Array<Map<string, string>>> = getFormattedGames(inputArray);
	let result = 0;
	formattedGames.forEach((value: Array<Map<string, string>>, key: number) => {
		if (checkIfGameisPossible(value)) {
			result += key;
		}
	});
	console.log(result);
}

const part1LoadedDice: { [key: string]: number } = {
	blue: 14,
	green: 13,
	red: 12,
};

if (import.meta.main) {
	const inputArray: Array<string> = getInput().split('\n');

	part1(inputArray);
	// part2(inputArray);
}