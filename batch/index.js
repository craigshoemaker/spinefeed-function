const renderer = require('../modules/renderer');
const validator = require('../modules/validator.js');

module.exports = async function (context, req) {

    try {

        const output = req.query.output;
        const isValidOutput = renderer.isSupportedType(output);
        const isValidBatch = !!(req.body);
        const batch = req.body;
    
        if (isValidOutput && isValidBatch) {
    
            const isOutputJSON = validator.isJSON(output);
            const result = validator.validateBatch(batch, output);
    
            context.res = {
                status: 200,
                body: {
                    isValid: true,
                    details: isOutputJSON ? result.details : result
                }
            };
    
            if(isOutputJSON) {
                context.res.contentType = 'application/json';
            }
        }
        else {
            context.res = {
                status: 400,
                body: {
                    message: 'Please provide a valid render type and article source.',
                    isValid: isValidOutput && isValidSource,
                    isValidRenderType: isValidOutput,
                    isValidSource: isValidSource,
                }
            };
        }

    } catch(ex) {
        context.log(ex);
        context.log(JSON.stringify(ex));
        context.res = {
            status: 500,
            body: {
                message: ex.message ? ex.message : 'Internal server error',
                error: ex
            }
        };
    }
};
