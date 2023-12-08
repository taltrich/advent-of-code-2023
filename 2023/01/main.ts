import { getInput } from '../../utils.ts';

export function checkAndParseNumberString(stringifiedNumber: string): string {
	if (stringifiedNumber in parsedStringNumber) {
		return parsedStringNumber[stringifiedNumber];
	}

	return stringifiedNumber;
}

export function getFormattedNumber(numberArray: Array<string>): number {
	let finishedNumber = 0;
	if (numberArray.length > 1) {
		finishedNumber = +(checkAndParseNumberString(numberArray[0]) +
			checkAndParseNumberString(numberArray[numberArray.length - 1]));
	} else if (numberArray.length === 1) {
		const parsedNumber: string = checkAndParseNumberString(numberArray[0]);
		finishedNumber = +(parsedNumber + parsedNumber);
	}

	return finishedNumber;
}

export function part1(inputArray: Array<string>): void {
	const numberArray: Array<number> = [];

	inputArray.forEach((inputString) => {
		const numbers: RegExpMatchArray | null = inputString.match(/\d/g);
		if (numbers == null) return true;
		numberArray.push(getFormattedNumber(numbers));
	});

	console.log('Part 1: ' + numberArray.reduce((a, b) => a + b));
}

export function part2(inputArray: Array<string>): void {
	const numberArray: Array<number> = [];
	const regex = new RegExp('(?=(\\d|' + Object.keys(parsedStringNumber).join('|') + '))', 'g');
	inputArray.forEach((inputString) => {
		const numbers: IterableIterator<RegExpMatchArray> = inputString.matchAll(regex);
		if (numbers == null) return true;
		const results = [...numbers].map((matchArray) => {
			return matchArray[1];
		});
		numberArray.push(getFormattedNumber(results));
	});

	console.log('Part 2: ' + numberArray.reduce((a, b) => a + b));
}

const parsedStringNumber: { [key: string]: string } = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

if (import.meta.main) {
	const inputArray: Array<string> = getInput().split('\n');

	part1(inputArray);
	part2(inputArray);
}
