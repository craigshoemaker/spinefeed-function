const markdownRenderer = require('./markdownRenderer')
const marked = require('marked');

const _module = {
    render: input => {
        let result = markdownRenderer.render(input);
        return marked(result);
    }
};

module.exports = _module;