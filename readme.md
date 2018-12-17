![Spinefeed](./spinefeed-logo.png)

Provides feedback on articles for required content elements.

## Usage
Based on the parameters you pass in, you can check different document types and output the results in different formats.

| Parameter | Description |
|-----------|-------------|
| *type*    | Designates what type of document validation rules to apply to the source. Values include `overview`, `quickstart` and `tutorial`. |
| *output*  | Determines the output rendered. Values include `json` (default), `string`, `markdown` and `html`. |

### Examples
Check a quickstart and render the output as a string (perfect for the console).

```bash
node index.js --type quickstart --output string --src "c:\quickstart.md"
```

Which produces something similar to following output:

```bash
Validation Summary:
----------------------------
- Total: 7, Passed: 0, Failed: 7


General
...........................
- Total: 2, Passed: 0, Failed: 2
- Broken rules:
  * H1 title must immediately follow metadata
  * Document must include metadata


Quickstart
...........................
- Total: 5, Passed: 0, Failed: 5
- Broken rules:
  * H1 format must be: "Quickstart: "
  * Required section: "Clean up resources"
  * Required section: "Next steps"
  * Link to free Azure account must come before first H2
  * "Clean up resouces" section must appear before "Next steps" section
```

The same information is available in Markdown format. The following command:

```bash
node index.js --type quickstart --output markdown --src "c:\quickstart.md"
```

... produces output like this:

```bash
## Validation Summary:
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
```