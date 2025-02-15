import * as assert from 'assert';

import * as pathResolver from '../../core/pathResolver';
import path from 'path';

suite('Extension Test Suite', () => {
	test('pathResolver test', () => {
		const target = path.resolve(process.cwd(), 'src/test/fixtures/project1/src');

		assert.match(pathResolver.getPhpClassDiagramPath(target), /vendor\/bin\/php-class-diagram$/ );
	});
});
