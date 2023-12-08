export function getInput(): string {
	return Deno.readTextFileSync('input.txt');
}
