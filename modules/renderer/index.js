const renderStrategies = {
    markdown: require('./markdownRenderer'),
    string: require('./stringRenderer'),
    html: require('./htmlRenderer')
};

const _module = {

    render: (input, strategy) => {
        let result = input;

        if(strategy && !!renderStrategies[strategy]) {
            result = renderStrategies[strategy].render(input);
        }

        return result;
    },

    isSupportedType: (type) => {
        return /json|string|markdown|html/i.test(type);
    }

};

module.exports = _module;