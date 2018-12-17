const markdownRenderer = require('./markdownRenderer')

const _module = {
    render: input => {
        let result = markdownRenderer.render(input);

        // replace H3s
        result = result.replace(/\#\#\# ?(.+)/g, '$1\n...........................');
        
        // replace H2s
        result = result.replace(/\#\# ?(.+)/g, '$1\n----------------------------');

        return result;
    }
};

module.exports = _module;