const rules = {
    general: require('./generalRules'),
    overview: require('./overviewRules'),
    quickstart: require('./quickstartRules'),
    tutorial: require('./tutorialRules')
};
    
const _module = {

    apply: (input, type) => {

        let generalResults, typeResults, results = {};

        generalResults = rules.general.apply(input);

        if(!!rules[type]) {
            typeResults = rules[type].apply(input);

            results = {
                details: [generalResults, typeResults],
                allPassed: generalResults.allPassed && typeResults.allPassed,
                total: generalResults.total + typeResults.total,
                passed: generalResults.passed + typeResults.passed,
                failed: generalResults.failed + typeResults.failed
            };
        } else {
            results = {
                details: [generalResults],
                allPassed: generalResults.allPassed,
                total: generalResults.total,
                passed: generalResults.passed,
                failed: generalResults.failed
            };
        }

        return results;
    },

    isSupportedType: (articleType) => {
        return /overview|quickstart|tutorial/i.test(articleType);
    }
};

module.exports = _module;