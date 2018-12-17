const rules = require('../validationRules')
const renderer = require('./stringRenderer');

const input = '';
const output = 'string';
const rulesResult = rules.apply(input, 'quickstart');

describe('markdownRenderer => ', () => {

    describe('render => ', () => {

        it('renders string titles', () => {
            const result = renderer.render(rulesResult, output);
            expect(/\.{20,}/.test(result)).toBe(true);            
            expect(/\-{20,}/.test(result)).toBe(true);
        });

    });

});