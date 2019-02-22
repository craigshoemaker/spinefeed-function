
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