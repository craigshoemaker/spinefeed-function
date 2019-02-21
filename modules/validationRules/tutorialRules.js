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
            apply: input => /title:.*tutorial.*/i.test(input)
        }
    ],

    apply: (input) => ruleApplicator(input, _module)
};

_module.rules.push(commonRules.linkToFreeAccountBeforeFirstH2);

module.exports = _module;