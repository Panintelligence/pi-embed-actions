import {assert} from 'chai';
import EmbedUtils from "../src/internal/utils/embed-utils.js";

describe('EmbedUtils test suite ', function () {

    it('Test validateUrl()', function () {
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk'), true);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk/pi'), true);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk:8224/pi'), true);
        assert.equal(EmbedUtils.validateUrl('http://dev.pi-dash.uk:8224/pi'), true);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT'), true);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk:8224/pi?lang=en_GB&token=abc&editorDisplayMode=CONTENT'), true);

        assert.equal(EmbedUtils.validateUrl(''), false);
        assert.equal(EmbedUtils.validateUrl(null), false);
        assert.equal(EmbedUtils.validateUrl('//dev.pi-dash.uk/pi'), false);
        assert.equal(EmbedUtils.validateUrl('dev.pi-dash.uk:8224/pi'), false);
        assert.equal(EmbedUtils.validateUrl('http://:8224/pi'), false);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk:8224/pi?lang=en_GB&editorDisplayMode=content'), false);
        assert.equal(EmbedUtils.validateUrl('https://dev.pi-dash.uk:8224/pi?lang=en_GB&editorDisplayMode=EMBED'), false);
        assert.equal(EmbedUtils.validateUrl('https:// dev.pi-dash.uk/pi'), false);
        assert.equal(EmbedUtils.validateUrl('https:// dev.pi-dash.uk/pi '), false);
        assert.equal(EmbedUtils.validateUrl('  https:// dev.pi-dash.uk/pi '), false);
    });
});