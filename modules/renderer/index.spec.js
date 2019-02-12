
const rules = require('../validationRules')
const renderer = require('./index.js');

const input = '';
describe('renderer => ', () => {

    describe('render => ', () => {

        it('renders JSON by default', () => {
            const rulesResult = rules.apply(input, 'quickstart');
            const result = renderer.render(rulesResult);
            expect(result.details[0].allPassed).toEqual(false);
        });

        it('renders markdown', () => {
            const rulesResult = rules.apply(input, 'quickstart');
            const result = renderer.render(rulesResult, 'markdown');
            const renderedString = result.string;
            expect(/\#\# .+/.test(renderedString)).toBe(true);
            expect(/\- .+/.test(renderedString)).toBe(true);
            expect(/  \* .+/.test(renderedString)).toBe(true);
        });

        it('renders string', () => {
            const rulesResult = rules.apply(input, 'quickstart');
            const result = renderer.render(rulesResult, 'string');
            const renderedString = result.string;
            expect(/\.{20,}/.test(renderedString)).toBe(true);
        });

    });

    describe('isSupportedType => ', () => {

        it('returns false when given an unsupported type', () => {
            expect(renderer.isSupportedType('foo')).toBe(false);
        });

        it('returns true when given a supported type', () => {
            expect(renderer.isSupportedType('json')).toBe(true);
        });
    })

});