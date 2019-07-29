const ruleApplicator = require('./ruleApplicator');

const EMAIL_PATTERN = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

const _module = {

    type: 'General',

    rules: [
        {
            description: 'H1 title must immediately follow metadata',
            apply: input => /---\s*\# /.test(input)
        },

        {
            description: 'Document must include metadata',
            apply: input => /(title|description|ms\.service|ms\.topic|ms\.date|ms\.author)\:/.test(input)
        },

        {
            description: 'Relative links must end with the ".md" extension',
            apply: input => {
                let returnValue = true;

                const links = input.match(/]\((?!http|https)(.*?)\)/g);
                
                if(links) {
                    const linksMissingExtension = links.filter(link => {
                        link = link.replace(/\?.*/, '');
                        
                        const isBookmark = /^\]\(\#/.test(link);
                        const isEmail = EMAIL_PATTERN.test(link);

                        if (isBookmark || isEmail) {
                            return false;
                        }
                        
                        const ext = link.substr(link.lastIndexOf('.'))
                                        .replace(')', '')
                                        .trim();

                        const isMarkdown = /md/i.test(ext);
                        const isImage = /jpg|png|gif|svg/i.test(ext);
                        const isYaml = /yml/i.test(ext);
                        return !isImage && !isMarkdown && !isYaml;
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