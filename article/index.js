const rules = require('../modules/validationRules');
const renderer = require('../modules/renderer');

module.exports = async function (context, req) {

    const isValidType = rules.isSupportedType(req.query.type);
    const isValidOutput = renderer.isSupportedType(req.query.output);
    const isValidSource = !!(req.body);
    const body = req.body.toString('utf8');

    if (isValidType && isValidOutput && isValidSource) {

        const type = req.query.type;
        const output = req.query.output;
        const isOutputJSON = /json/.test(output);

        const feedback = rules.apply(body, type);
        const result = renderer.render(feedback, output);

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
                message: 'Please provide a valid article type, render type and article source.',
                isValid: isValidType && isValidOutput && isValidSource,
                isValidArticleType: isValidType,
                isValidRenderType: isValidOutput,
                isValidSource: isValidSource,
            }
        };
    }
};
