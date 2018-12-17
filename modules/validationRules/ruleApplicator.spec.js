const ruleApplicator = require('./ruleApplicator');

const model = {
    rules:[
        { description: 'passing', apply: input => true },
        { description: 'passing', apply: input => true },
        { description: 'failing', apply: input => false },
        { description: 'failing', apply: input => false },
    ],

    type: 'test'
};


const input = 'this is a test';

describe('ruleApplicator', () => {

    describe('return value: ', () => {

        it('number of broken and unbroken rules equals total', () => {
            const results = ruleApplicator(input, model);
            expect(results.total).toBe(results.failed + results.passed);
        });

        it('number of broken rules is greater than 0', () => {
            const results = ruleApplicator(input, model);            
            expect(results.failed).toBeGreaterThan(0);
        });

        it('number of unbroken rules is greater than 0', () => {
            const results = ruleApplicator(input, model);
            expect(results.passed).toBeGreaterThan(0);
        });

        it('rule type is returned in result', () => {
            const results = ruleApplicator(input, model);
            expect(results.type).toEqual('test');
        });

    });

});