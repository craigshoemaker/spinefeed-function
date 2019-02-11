![Spinefeed](./spinefeed-logo.png)

Spinefeed provides Content Model feedback for *quickstart*, *overview* and *tutorial* articles. This function is exposed via a [web interface](http://craigshoemaker.github.io/spinefeed-website) and [VS Code extension](https://github.com/craigshoemaker/spinefeed-extension).

## Usage
Based on the parameters you pass in, you can check different document types and output the results in different formats. The article type is read from the `ms.topic` metadata field.

| Parameter | Description |
|-----------|-------------|
| *output*  | Determines the output rendered. Values include `json` (default), `string`, `markdown` and `html`. |

### Examples
Check an article and render the output as HTML.

```javascript
const getFeedback = async () => {
    const url = `https://spinefeed.azurewebsites.net/api/article?output=html`;
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: '<ARTICLE_TEXT>' // pass in article text here 
    };
    const response = await fetch(url, options);
    const html = await response.text();
    return html;
}

getFeedback().then(html => console.log(html));
```

Which produces something similar to following output:

### Validation Summary:
- Total: 7, Passed: 0, Failed: 7

### General
- Total: 2, Passed: 0, Failed: 2
- Broken rules:
  * H1 title must immediately follow metadata
  * Document must include metadata

### Quickstart
- Total: 5, Passed: 0, Failed: 5
- Broken rules:
  * H1 format must be: "Quickstart: "
  * Required section: "Clean up resources"
  * Required section: "Next steps"
  * Link to free Azure account must come before first H2
  * "Clean up resouces" section must appear before "Next steps" section

## Tests

Each validation rule is accompanied by a series of tests. Run the tests via:

```bash
npm test
```

