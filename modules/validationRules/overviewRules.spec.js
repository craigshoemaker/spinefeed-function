const rules = require('./overviewRules');

const validInput = `
---
metadata
---

# What is Blob Storage?

## Next steps`;

describe('overviewRules => ', () => {

    describe('passes: ', () => {

        it('valid document passes all rules', () => {
            const result = rules.apply(validInput);
            expect(result.total).toEqual(result.passed);
            expect(result.allPassed).toBe(true);
        });

    });

    describe('fails: ', () => {

        it('missing required words in overview title"', () => {
            const invalid = validInput.replace('# What is', '# ');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('H1 format must be: "What is <service>?"')).toBe(true);
        });

        it('missing question mark in title"', () => {
            const invalid = validInput.replace('Storage?', 'Storage');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('H1 format must be: "What is <service>?"')).toBe(true);
        });

        it('missing required "Next steps" section', () => {
            const invalid = validInput.replace('Next steps', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required section: "Next steps"')).toBe(true);
        });

    });

});