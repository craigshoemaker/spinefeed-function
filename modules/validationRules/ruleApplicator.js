module.exports = (input, model) => {
    const 
          brokenRuleDescriptions = []
        , numberOfRules = model.rules.length
    ;

    model.rules.forEach(rule => {
        if(!rule.apply(input)) {
            brokenRuleDescriptions.push(rule.description);
        };
    });

    const 
          numberOfBrokenRules = brokenRuleDescriptions.length
        , numberOfUnbrokenRules = numberOfRules - numberOfBrokenRules
    ;

    return {
        type: model.type,
        brokenRules: brokenRuleDescriptions,
        allPassed: numberOfBrokenRules === 0,
        total: numberOfRules,
        passed: numberOfUnbrokenRules,
        failed: numberOfBrokenRules
    };
};