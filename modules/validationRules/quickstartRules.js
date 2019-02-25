const 
      ruleApplicator = require('./ruleApplicator')
    , commonRules = require('./commonRules')
;

const _module = {

    type: 'Quickstart',

    rules: [
        {
            description: 'H1 format must be: "Quickstart: "',
            apply: input => /\# ?Quickstart\: /.test(input)
        },

        {
            description: 'Required section: "Clean up resources"',
            apply: input => /## ?Clean up resources/.test(input)
        },

        {
            description: 'Required section: "Next steps"',
            apply: input => /## ?Next steps/.test(input)
        },

        // update to ensure clean up resources come directly before
        {
            description: '"Clean up resouces" section must appear before "Next steps" section',
            apply: input => commonRules.stringBefore(input, 'Clean up resources', 'Next steps')
        },

        {
            description: '"mstopic: quickstart" is required in metadata',
            apply: input => /ms\.topic:\s*quickstart\s*\n/.test(input)
        },

        {
            description: 'Checklists are not allowed in a quickstart',
            apply: input => {
                return !/class="checklist"/.test(input)
            }
        },

        {
            description: 'Required metadata: Customer intent statement',
            apply: input => commonRules.requireCustomerIntent(input)
        },

        {
            description: 'The word "quickstart" must appear in metadata description',
            apply: input => commonRules.requireKeywordInMetadataDescription(input, 'quickstart')
        }, 

        {
            description: 'The word "quickstart" must appear in metadata title',
            apply: input => commonRules.requireKeywordInMetadataTitle(input, 'quickstart')
        },

        {
            description: 'Required sentence after intro paragraph: "In this quickstart"',
            apply: input => commonRules.requireKeywordInFirstSentenceAfterFirstParagraph(input, 'quickstart')
        },

        {
            description: 'Article must not be introduced as a guide|topic|article',
            apply: input => commonRules.disallowUseOfAlternateArticleDescriptors(input)
        },

        {
            description: 'Prerequisites must be the first H2',
            apply: input => {
                const prereqIndex = input.indexOf('\n## Prerequisites');
                const firstH2Index = input.indexOf('\n## ');

                let isInRightOrder = true;

                if (prereqIndex > -1) {
                    isInRightOrder = (prereqIndex === firstH2Index);
                }

                return isInRightOrder;
            }
        },

        {
            description: 'Titles may not start with "Step" followed by a number',
            apply: input => commonRules.disallowTitlesPrefixedByStep(input)
        },

        {
            description: 'Next step action formatted link is required after Next steps title',
            apply: input => commonRules.requireNextStepActionFormattedLink(input)
        },
        
    ],

    apply: (input) => ruleApplicator(input, _module)
};

_module.rules.push(commonRules.linkToFreeAccountBeforeFirstH2);

module.exports = _module;