import * as assert from 'assert';

import * as pathResolver from '../../core/pathResolver';
import path from 'path';

suite('pathResolver Test Suite', () => {
	test('exists entrypoint installed by composer', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/src');

		assert.match(pathResolver.getPhpClassDiagramPath(target), /vendor\/bin\/php-class-diagram$/);
	});

	test('dosen\'t exist entrypoint installed by composer', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_no_executable/src');

		assert.strictEqual(pathResolver.getPhpClassDiagramPath(target), '', '探せなかったら空文字');
	});
});
