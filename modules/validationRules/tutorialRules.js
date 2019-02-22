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
            apply: input => /## ?Clean up resources/.test(input)
        },

        {
            description: 'Required section: "Next steps"',
            apply: input => /## ?Next steps/.test(input)
        },

        {
            description: '"Clean up resouces" section must appear before "Next steps" section',
            apply: input => commonRules.stringBefore(input, 'Clean up resources', 'Next steps')
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
                const introduction = input.match(/\n\#.+\n\n(.*)/);
                if (introduction && introduction.length > 0) {
                  value = introduction[1].match(/\.\s/g).length < 6;
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
            apply: input => /\#\s+.*\n{2,}.+\n{2,}In this tutorial/.test(input)
        },

        {
            description: 'Checklist is required after paragraph that contains "In this tutorial"',
            apply: input => /\#\s+.*\n{2,}.+\n{2,}In this tutorial.+\n{2,}\> \[\!div class=\"checklist\"\]/.test(input)
        },

        {
            description: 'Article must be introduced as "In this tutorial"',
            apply: input => !/In this (guide|article|topic)/.test(input)
        },

        {
            description: 'Titles may not start with "Step" followed by a number',
            apply: input => !/\#{2,}\s+Step:?\s+(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|[1-9])/g.test(input)
        },

        {
            description: 'Next step action formatted link is required after Next steps title',
            apply: input => /##\s+Next steps\n{2,}\> \[\!div class=\"nextstepaction\"\]/.test(input)
        }
    ],

    apply: (input) => ruleApplicator(input, _module)
};

_module.rules.push(commonRules.linkToFreeAccountBeforeFirstH2);

module.exports = _module;