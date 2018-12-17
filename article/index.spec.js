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
                articleType: 'quickstart',
                output: '' // set in tests
            },
            body: {
                source: quickstartMarkdown
            }
        };

    it('should return json', async (done) => {
        request.query.output = 'json';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(context.res.body[1].total).toBeGreaterThan(0);
        done();
    });

    it('should return html', async (done) => {
        request.query.output = 'html';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/\<h2/i.test(context.res.body)).toBeTruthy();
        done();
    });

    it('should return markdown', async (done) => {
        request.query.output = 'markdown';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/## /i.test(context.res.body)).toBeTruthy();
        done();
    });

    it('should return a string', async (done) => {
        request.query.output = 'string';
        await func(context, request);
        expect(context.res.body.isValid).toBeTruthy();
        expect(/-------------/i.test(context.res.body)).toBeTruthy();
        done();
    });

});