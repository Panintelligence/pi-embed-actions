import {assert} from 'chai';
import {EditorDisplayMode} from "../src/internal/utils/editor-display-mode.js";

describe('EditorDisplayMode test suite ', function () {

    it('Test validate()', function () {
        assert.equal(EditorDisplayMode.validate('CONTENT'), true);
        assert.equal(EditorDisplayMode.validate('ALL'), true);
        assert.equal(EditorDisplayMode.validate('EMBED'), false);
        assert.equal(EditorDisplayMode.validate('content'), false);
        assert.equal(EditorDisplayMode.validate('all'), false);
        assert.equal(EditorDisplayMode.validate(123), false);
    });
});