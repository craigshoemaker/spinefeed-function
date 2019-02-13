const rules = require('./validationRules');
const renderer = require('./renderer'); 

const validator = {

    getArticleType: (content) => {
        const matches = content.match(/ms\.topic:(.*)/);
        let type = '';
        if(matches && matches.length > 1) {
            type = matches[1].trim();
        }
        return type;
    },

    getArticleTitle: (content) => {
        const matches = content.match(/\#\s(.+)/);
        let title = 'TITLE NOT FOUND';
        if(matches && matches.length > 1) {
            title = matches[1].trim();
        }
        return title;
    },

    isJSON: (value) => /json/.test(value),

    validateBatch: (batch, output) => {
        const batchResults = {
            total: 0,
            invalid: 0,
            valid: 0,
            articles: []
        };

        batch.forEach(article => {
            const articleResult = validator.validate(article.content, output);
            const title = validator.getArticleTitle(article.content);

            batchResults.total++;

            if(articleResult.data.allPassed) {
                batchResults.valid++;
            } else {
                batchResults.invalid++;
            }

            batchResults.articles.push({
                filePath: article.filePath,
                string: articleResult.string,
                data: articleResult.data,
                title: title
            });
        });

        return batchResults;
    },

    validate: (content, output) => {
        const type = validator.getArticleType(content);
        const feedback = rules.apply(content, type);
        const result = renderer.render(feedback, output);
        return result;
    }
};

module.exports = validator;