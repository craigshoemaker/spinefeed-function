const fs = require('fs');
const path = require('path');
const func = require('./index');
const quickstartMarkdown = fs.readFileSync(path.resolve('./spec/data/quickstart.md'), 'utf8');

describe('article function', () => {

    const context = {
        log: console.log
    };

    const request = {
            query: {
                type: 'quickstart',
                output: '' // set in tests
            },
            body: quickstartMarkdown
        };

    it('should return json', async () => {
        request.query.output = 'json';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(context.res.body.details[1].total).toBeGreaterThan(0);
    });

    it('should return html', async () => {
        request.query.output = 'html';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/\<h3/i.test(context.res.body.details.string)).toBeTruthy();
    });

    it('should return markdown', async () => {
        request.query.output = 'markdown';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/### /i.test(context.res.body.details.string)).toBeTruthy();
    });

    it('should return a string', async () => {
        request.query.output = 'string';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/\.{20,}/i.test(context.res.body.details.string)).toBeTruthy();
    });

});