const rules = require('../validationRules')
const renderer = require('./htmlRenderer');

const input = '';
const output = 'html';
const rulesResult = rules.apply(input, 'quickstart');

describe('htmlRenderer => ', () => {

    describe('render => ', () => {

        it('renders HTML markup', () => {
            const result = renderer.render(rulesResult, output);
            expect(/<.*?>/.test(result.string)).toBe(true);            
        });

    });

});