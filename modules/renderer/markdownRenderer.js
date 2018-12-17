

const _module = {

    render: result => {
        const builder = [];

        builder.push('\n');
        builder.push(`## Validation Summary:`);
        builder.push(`- Total: ${result.total}, Passed: ${result.passed}, Failed: ${result.failed}`);

        if(!result.allPassed) {
            builder.push('\n');
            
            result.details.forEach(item => {
                if(!item.allPassed) {
                    builder.push(`### ${item.type}`);
                    builder.push(`- Total: ${item.total}, Passed: ${item.passed}, Failed: ${item.failed}`);
                    builder.push('- Broken rules:');
                    if(item.brokenRules.length > 0) {
                        builder.push('  * ' + item.brokenRules.join('\n  * '));
                    }
                    builder.push('\n');
                }
            });
        }
        
        return builder.join('\n');
    }

};

module.exports = _module;