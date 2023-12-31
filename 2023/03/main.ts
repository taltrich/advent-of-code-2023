import { getInput } from '../../utils.ts';

function getFilledRowsBySpecialChars(inputArray: Array<string>): Map<number, Array<number>> {
	const specialCharPosMap = new Map<number, Array<number>>();
	inputArray.forEach((value: string, index: number) => {
		const specialCharPosArray: Array<number> = [];
		const regex = new RegExp(/[^\d\s.]/, 'g');
		let match: RegExpExecArray | null = null;
		while ((match = regex.exec(value)) !== null) {
			if (match.index > 0) {
				specialCharPosArray.push(match.index - 1);
			}
			specialCharPosArray.push(match.index);
			if (match.index < value.length - 1) {
				specialCharPosArray.push(match.index + 1);
			}
		}
		specialCharPosMap.set(index, specialCharPosArray);
	});

	const filledMap = new Map<number, Array<number>>();
	specialCharPosMap.forEach(
		(value: Array<number>, index: number, map: Map<number, Array<number>>) => {
			const check: Array<number> = [];
			const testprio: Array<number> = map.get(index - 1)!;
			const test: Array<number> = map.get(index + 1)!;
			if (testprio != null) {
				check.push(...testprio);
			}
			check.push(...value);
			if (test != null) {
				check.push(...test);
			}
			filledMap.set(index, [...new Set(check)].sort((a, b) => a - b));
		},
	);
	return filledMap;
}

function getCorrectNumbers(
	stringArray: Array<string>,
	specialCharPosMap: Map<number, Array<number>>,
): Array<number> {
	const matchingNumbers: Array<number> = [];
	stringArray.map((rowString: string, index: number) => {
		const regex = new RegExp(/\d+/, 'g');
		const specialCharSelectionForRow: Array<number> = specialCharPosMap.get(index)!;
		let match: RegExpExecArray | null = null;
		while ((match = regex.exec(rowString)) !== null) {
			if (
				specialCharSelectionForRow.includes(match.index) ||
				specialCharSelectionForRow.includes(match.index + match[0].length - 1)
			) {
				matchingNumbers.push(parseInt(match[0]));
			}
		}
	});
	return matchingNumbers;
}

export function part1(inputArray: Array<string>): void {
	const specialCharSelectionPosMap = getFilledRowsBySpecialChars(inputArray);
	const correctNumbers = getCorrectNumbers(inputArray, specialCharSelectionPosMap);

	const result = correctNumbers.reduce((a, b) => a + b);

	console.log('Part 1: ' + result);
}

if (import.meta.main) {
	const inputArray: Array<string> = getInput().split('\n');

	part1(inputArray);
	// part2(inputArray)
}
