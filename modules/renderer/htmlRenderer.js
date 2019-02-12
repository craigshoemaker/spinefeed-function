const markdownRenderer = require('./markdownRenderer')
const marked = require('marked');

const _module = {
    render: data => {
        const result = markdownRenderer.render(data);
        const html = marked(result.string);
        return {
            string: html,
            data: data
        };
    }
};

module.exports = _module;