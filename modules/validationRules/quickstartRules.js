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
            description: '"quickstart" is required in the metdata description field',
            apply: input => /description:\s*.*quickstart.*\n/.test(input)
        },

        {
            description: 'Customer intent statement is required in metadata',
            apply: input => /Customer intent:\s.{25,}\n/.test(input)
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
        }
    ],

    apply: (input) => ruleApplicator(input, _module)
};

_module.rules.push(commonRules.linkToFreeAccountBeforeFirstH2);

module.exports = _module;