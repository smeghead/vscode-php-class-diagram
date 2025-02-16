import * as assert from 'assert';

import * as commandBuilder from '../../core/commandBuilder';
import path from 'path';

suite('commandBuilder Test Suite', () => {
	test('commandBuilder normal test', () => {
		const phpClassDiagram = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/vendor/bin/php-class-diagram');
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/src');
		const timestamp = '123456';
		const tmpDir = '/tmp';
		const output = `/tmp/${timestamp}.puml`;

		const expected = `${phpClassDiagram} ${target} > ${output}`;

		const result = commandBuilder.getCommand(phpClassDiagram, target, output);
		assert.strictEqual(result, expected);
	});
});
