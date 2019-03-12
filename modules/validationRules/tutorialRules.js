const
      ruleApplicator = require('./ruleApplicator')
    , commonRules = require('./commonRules')
;

const _module = {

    type: 'Tutorial',

    rules: [
        {
            description: 'Required text in H1: "Tutorial: "',
            apply: input => /\# ?Tutorial\: /.test(input)
        },

        {
            description: 'Checklist must appear before first H2',
            apply: input => commonRules.stringBefore(input, 'class="checklist"', '##')
        },

        {
            description: 'Checklist is required',
            apply: input => /\> \[\!div class=\"checklist\"\]/.test(input)
        },

        {
            description: 'Required section: "Clean up resources"',
            apply: input => commonRules.requireCleanUpResources(input)
        },

        {
            description: 'Required section: "Next steps"',
            apply: input => /## ?Next steps/.test(input)
        },

        {
            description: '"Clean up resouces" section must appear before "Next steps" section',
            apply: input => commonRules.requireCleanUpResourcesToPreceedNextSteps(input)
        },

        {
            description: 'Required metadata: ms.topic: tutorial',
            apply: input => /ms\.topic\:\stutorial/.test(input)
        },

        {
            description: 'Do not number titles',
            apply: input => !/##+\s\d/.test(input)
        },

        {
            description: 'Prerequisites must be the first H2',
            apply: input => {
                const prereqIndex = input.indexOf('\n## Prerequisites');
                const firstH2Index = input.indexOf('\n## ');

                return prereqIndex === firstH2Index;
            }
        },

        {
            description: 'The word "tutorial" must appear in metadata title',
            apply: input => commonRules.requireKeywordInMetadataTitle(input, 'tutorial')
        },

        {
            description: 'The word "tutorial" must appear in metadata description',
            apply: input => commonRules.requireKeywordInMetadataDescription(input, 'tutorial')
        }, 

        {
            description: 'Introductory sentence must be no more than 6 sentences.', 
            apply: input => {
                let value = false;
                const groups = input.match(/\n\#.+\n\n(.*)/);
                if (groups && groups.length > 0) {
                    const introduction = groups[1].trim();
                    const sentences = introduction.split('. ');
                    value = sentences.length <= 6;
                }
                return value;
            }
        },

        {
            description: 'Required metadata: Customer intent statement',
            apply: input => commonRules.requireCustomerIntent(input)
        },

        {
            description: 'Required sentence after intro paragraph: "In this tutorial"',
            apply: input => commonRules.requireKeywordInFirstSentenceAfterFirstParagraph(input, 'tutorial')
        },

        {
            description: 'Checklist is required after paragraph that contains "In this tutorial"',
            apply: input => {
                const result = /In this tutorial.+[\r\n]{2,}.*class=\"checklist\"/g.test(input);
                return result;
            }
        },

        {
            description: 'Article must not be introduced as a guide|topic|article',
            apply: input => commonRules.disallowUseOfAlternateArticleDescriptors(input)
        },

        {
            description: 'Titles may not start with "Step" followed by a number',
            apply: input => commonRules.disallowTitlesPrefixedByStep(input)
        },

        {
            description: 'Next step action formatted link is required after Next steps title',
            apply: input => commonRules.requireNextStepActionFormattedLink(input)
        }
    ],

    apply: (input) => ruleApplicator(input, _module)
};

_module.rules.push(commonRules.linkToFreeAccountBeforeFirstH2);

module.exports = _module;