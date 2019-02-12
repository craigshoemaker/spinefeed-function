const rules = require('../validationRules')
const renderer = require('./markdownRenderer');

const input = '';
const output = 'markdown';
const rulesResult = rules.apply(input, 'quickstart');

const generalOnly = {
    details:
        [{
            type: 'General',
            brokenRules: [],
            allPassed: false,
            total: 2,
            passed: 0,
            failed: 2
        },
        {
            type: 'Quickstart',
            brokenRules: [],
            allPassed: true,
            total: 5,
            passed: 5,
            failed: 0
        }],
    allPassed: false,
    total: 7,
    passed: 5,
    failed: 2
};

describe('markdownRenderer => ', () => {

    describe('render => ', () => {

        it('does not render type section if there are no broken rules for the type', () => {
            const result = renderer.render(generalOnly, output);
            expect(/Quickstart/.test(result.string)).toBe(false);
        });

        it('renders markdown titles', () => {
            const result = renderer.render(rulesResult, output);
            expect(/\#\# .+/.test(result.string)).toBe(true);
        });

        it('renders markdown list items', () => {
            const result = renderer.render(rulesResult, output);
            const renderedString = result.string;
            expect(/\- .+/.test(renderedString)).toBe(true);
            expect(/  \* .+/.test(renderedString)).toBe(true);
        });

    });

});