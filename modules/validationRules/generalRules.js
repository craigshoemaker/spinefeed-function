const ruleApplicator = require('./ruleApplicator');

const _module = {

    type: 'General',

    rules: [
        {
            description: 'H1 title must immediately follow metadata',
            apply: input => /---\n(\n)?\#/.test(input)
        },

        {
            description: 'Document must include metadata',
            apply: input => /(title|description|ms\.service|ms\.topic|ms\.date|ms\.author)\:/.test(input)
        },

        {
            description: 'Required metadata: Customer intent',
            apply: input => /\# ?Customer intent:\s/.test(input)
        },

        {
            description: 'Relative links must end with the ".md" extension',
            apply: input => {
                let returnValue = true;

                const links = input.match(/\]\((~|\.).*\)/g);
                
                if(links) {
                    const linksMissingExtension = links.filter(link => {
                        const ext = link.substr(link.lastIndexOf('.'));
                        const isMarkdown = /md/i.test(ext);
                        const isImage = /jpg|png|gif|svg/i.test(ext);
                        return !isImage && !isMarkdown;
                    });

                    returnValue = linksMissingExtension.length === 0;
                }

                return returnValue;
            }
        }
    ],

    apply: (input) => ruleApplicator(input, _module)
};

module.exports = _module;