const commonRules = require('./commonRules');

describe('commonRules => ', () => {

    it('stringBefore ', () => {
        const original = 'first second';
        const isFirst = commonRules.stringBefore(original, 'first', 'second');
        expect(isFirst).toBe(true);
    });

});