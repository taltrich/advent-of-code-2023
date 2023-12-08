import { assertEquals } from 'assert';
import { add } from '../01/main.ts';

Deno.test(function addTest() {
	assertEquals(add(2, 3), 5);
});
