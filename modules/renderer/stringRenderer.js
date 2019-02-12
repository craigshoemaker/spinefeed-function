const markdownRenderer = require('./markdownRenderer')

const _module = {
    render: data => {
        let markdown = markdownRenderer.render(data);

        // replace H3s
        markdown = markdown.string.replace(/\#\#\# ?(.+)/g, '$1\n...........................');
        
        // replace H2s
        markdown = markdown.replace(/\#\# ?(.+)/g, '$1\n----------------------------');

        return {
            string: markdown,
            data: data
        };
    }
};

module.exports = _module;