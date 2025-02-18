import * as assert from 'assert';

import * as pathResolver from '../../core/pathResolver';
import path from 'path';

suite('pathResolver Test Suite', () => {
	test('exists entrypoint installed by composer', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_ok/src');

		assert.match(pathResolver.getPhpClassDiagramPath(target, undefined), /vendor\/bin\/php-class-diagram$/);
	});

	test('dosen\'t exist entrypoint installed by composer', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_no_executable/src');

		assert.strictEqual(pathResolver.getPhpClassDiagramPath(target, undefined), '', '探せなかったら空文字');
	});

	test('executablePath setting exists.', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project_no_executable/src');

		assert.strictEqual(pathResolver.getPhpClassDiagramPath(target, 'php-class-diagram'), 'php-class-diagram', '設定が存在する');
	});
});
