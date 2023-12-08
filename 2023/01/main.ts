export function getInput(): string {
	return Deno.readTextFileSync('input.txt');
}

export function getFormattedNumberPart1(numberArray: Array<string>): number {
	let finishedNumber = 0;
	if (numberArray.length > 1) {
		finishedNumber = +(numberArray[0] + numberArray[numberArray.length - 1]);
	} else if (numberArray.length === 1) {
		finishedNumber = +(numberArray[0] + numberArray[0]);
	}

	return finishedNumber;
}

export function checkAndParseNumberString(stringifiedNumber: string): string {
	if (stringifiedNumber in parsedStringNumber) {
		return parsedStringNumber[stringifiedNumber];
	}
	return stringifiedNumber;
}

export function getFormattedNumberPart2(numberArray: Array<string>): number {
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

function getResult(numberArray: Array<number>): number {
	let result = 0;
	numberArray.forEach((value) => {
		result += value;
	});

	return result;
}

export function part1(inputArray: Array<string>): void {
	const numberArray: Array<number> = [];

	inputArray.forEach((inputString) => {
		const numbers: RegExpMatchArray | null = inputString.match(/\d/g);
		if (numbers == null) return true;
		numberArray.push(getFormattedNumberPart1(numbers));
	});

	console.log('Part 1: ' + getResult(numberArray));
}

export function part2(inputArray: Array<string>): void {
	const numberArray: Array<number> = [];
	const regex = new RegExp('\\d|' + Object.keys(parsedStringNumber).join('|'), 'g');
	inputArray.forEach((inputString) => {
		const numbers: RegExpMatchArray | null = inputString.match(regex);
		if (numbers == null) return true;
		numberArray.push(getFormattedNumberPart2(numbers));
	});

	console.log('Part 2: ' + getResult(numberArray));
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
	const input: string = getInput();
	const inputArray: Array<string> = input.split('\n');

	part1(inputArray);
	part2(inputArray);
}
