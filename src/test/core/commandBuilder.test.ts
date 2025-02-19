import * as assert from 'assert';

import * as commandBuilder from '../../core/commandBuilder';
import path from 'path';

suite('commandBuilder Test Suite', () => {
	test('commandBuilder class diagram test', () => {
		const phpClassDiagram = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/vendor/bin/php-class-diagram');
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/src');
		const output = `/tmp/123456.puml`;

		const expected = `${phpClassDiagram} ${target} > ${output}`;

		const result = commandBuilder.getCommand(commandBuilder.Commands.CLASS_DIAGRAM, phpClassDiagram, target, output);
		assert.strictEqual(result, expected);
	});

	test('commandBuilder package diagram test', () => {
		const phpClassDiagram = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/vendor/bin/php-class-diagram');
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/src');
		const output = `/tmp/123456.puml`;

		const expected = `${phpClassDiagram} --package-diagram ${target} > ${output}`;

		const result = commandBuilder.getCommand(commandBuilder.Commands.PACKAGE_DIAGRAM, phpClassDiagram, target, output);
		assert.strictEqual(result, expected);
	});
});
