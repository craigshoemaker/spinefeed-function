
const _module = {
    stringBefore: (input, firstString, secondString) => {
        const firstStringIndex = input.indexOf(firstString)
            , secondStringIndex = input.indexOf(secondString)
        ;

        const isInvalidFirstString = (firstStringIndex === -1 || firstString === '');

        if(isInvalidFirstString) {
            return false;
        } else {
            return firstStringIndex < secondStringIndex;
        }
    },

    requireCleanUpResourcesToPreceedNextSteps: input => /(##\s+Clean up resources|\[\!INCLUDE.*cleanup.*\])(.|[\r\n])*\#{2,}\s*Next steps/.test(input),

    requireCleanUpResources: input => /(##\s+Clean up resources)|(\[\!INCLUDE.*cleanup.*\])/.test(input),

    requireCustomerIntent: (input) => {
        return /\#\s+customer intent:\s+.+/i.test(input);
    },

    requireKeywordInMetadataDescription: (input, keyword) => {
        const regex = new RegExp(`description:.*${keyword}.*`, 'i');
        return regex.test(input);
    },

    requireKeywordInMetadataTitle: (input, keyword) => {
        const regex = new RegExp(`title:.*${keyword}.*`, 'i');
        return regex.test(input);
    },

    requireKeywordInFirstSentenceAfterFirstParagraph: (input, keyword) => {
        const regex = new RegExp(`^-{3,}[\\r\\n]{1,}\\#{1,1}\\s+(.|[\\r\\n])*?In this ${keyword}`, 'm');
        const result =  regex.test(input);
        return result;
    },

    requireNextStepActionFormattedLink: input => {
        const result = /\#\s+Next steps\s{0,}\n{1,}.*nextstepaction/.test(input);
        return result;
    },

    disallowUseOfAlternateArticleDescriptors: (input) => !/In this (guide|article|topic)/.test(input),

    disallowTitlesPrefixedByStep: input => !/\#{2,}\s+Step:?\s+(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|[1-9])/gi.test(input),

    linkToFreeAccountBeforeFirstH2 : {
        description: 'Link to free Azure account must come before first H2',
        apply: input =>  {

            const freeLinkUrls = [
                'azure.microsoft.com/free',
                'web.powerapps.com/signup',
                'app.powerbi.com/signupredirect'
            ];

            let freeLinkUrl = '';

            for(var i = 0; i < freeLinkUrls.length; i++) {
                if(input.indexOf(freeLinkUrls[i]) > 0){
                    freeLinkUrl = freeLinkUrls[i];
                    break;
                }
            }
            
            return _module.stringBefore(input, freeLinkUrl, '##')
        }
    }
};

module.exports = _module;