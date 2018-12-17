const rules = require('../modules/validationRules');
const renderer = require('../modules/renderer');

module.exports = async function (context, req) {

    const isValidArticleType = rules.isSupportedType(req.query.articleType);
    const isValidOutputType = renderer.isSupportedType(req.query.output);
    const isValidSource = !!(req.body && req.body.length > 0);

    context.log('body: ' + req.body);

    if (isValidArticleType && isValidOutputType && isValidSource) {

        const articleType = req.query.articleType;
        const outputType = req.query.output;

        const feedback = rules.apply(req.body, articleType);
        const result = renderer.render(feedback, outputType);

        context.res = {
            status: 200,
            body: {
                isValid: true,
                details: /json/.test(outputType) ? result.details : result
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: {
                message: 'Please provide a valid article type, render type and article source.',
                isValid: isValidArticleType && isValidOutputType && isValidSource,
                isValidArticleType: isValidArticleType,
                isValidRenderType: isValidOutputType,
                isValidSource: isValidSource,
            }
        };
    }
};
