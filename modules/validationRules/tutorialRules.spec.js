const rules = require('./tutorialRules');

const validInput = `
---
title: This is a tutorial
description: This is a tutorial
ms.topic: tutorial

# Customer intent: this is the customer intent
---

# Tutorial: Yep?

Sentence number one. Sentence number two. Sentence number three. Sentence number four. Sentence number five. Sentence number six.

* bullet one
* bullet two
* bullet three

In this tutorial you learn to work with Azure.

> [!div class="checklist"]
> * Create and connect to a VM
> * Select and use VM images
> * Resize a VM
> * Veiew and understand VM state

To complete this quickstart, you need an [Azure subscription](https://azure.microsoft.com/free/?WT.mc_id=A261C142F)

## Prerequisites

## Download the sample application

## Clean up resources

## Next steps

> [!div class="nextstepaction"]
> [Azure Windows virtual machine tutorials](./tutorial-manage-vm.md)`;

describe('tutorialRules => ', () => {

    describe('passes: ', () => {

        it('valid document passes all rules', () => {
            const result = rules.apply(validInput);
            expect(result.total).toEqual(result.passed);
            expect(result.allPassed).toBe(true);
        });

        it('Allow INCLUDE file for "Clean up resources" section', () => {
            const valid = validInput.replace('## Clean up resources', '[!INCLUDE [Cleanup](includes/signalr-quickstart-cleanup.md)]');
            const results = rules.apply(valid);
            expect(results.allPassed).toBe(true);
        });

    });

    describe('fails: ', () => {

        it('missing required words in tutorial title"', () => {
            const invalid = validInput.replace('# Tutorial: ', '# ');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required text in H1: "Tutorial: "')).toBe(true);
        });

        it('missing checklist"', () => {
            const invalid = validInput.replace('class="checklist"', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Checklist is required')).toBe(true);
        });

        it('missing required "Next steps" section', () => {
            const invalid = validInput.replace('Next steps', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required section: "Next steps"')).toBe(true);
        });

        it('"Next steps" comes before "Clean up resources"', () => {
            const invalid = validInput.replace('# Clean up resources', '# Next steps # Clean up resources');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('"Clean up resouces" section must appear before "Next steps" section')).toBe(true);
        });
        
        it('missing required "Next steps" section', () => {
            const invalid = validInput.replace('Next steps', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required section: "Next steps"')).toBe(true);
        });

        it('checklist is not before first H2', () => {
            const invalid = validInput.replace('> [!div', '## Test\n\n> [!div');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Checklist must appear before first H2')).toBe(true);
        });

        it('Required metadata: ms.topic: tutorial', () => {
            const invalid = validInput.replace('ms.topic: tutorial', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required metadata: ms.topic: tutorial')).toBe(true);
        });

        it('Do not number titles', () => {
            const invalid = validInput.replace('## Download', '## 1: Download');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Do not number titles')).toBe(true);
        });

        it('Prerequisites must be the first H2', () => {
            const invalid = validInput.replace('## Prerequisites', '## First H2');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Prerequisites must be the first H2')).toBe(true);
        });

        it('Metadata title does not include "tutorial"', () => {
            const invalid = validInput.replace('title: This is a tutorial', 'title: This is a quickstart');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('The word "tutorial" must appear in metadata title')).toBe(true);
        });

        it('Metadata description does not include "tutorial"', () => {
            const invalid = validInput.replace('description: This is a tutorial', 'description: This is a quickstart');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('The word "tutorial" must appear in metadata description')).toBe(true);
        });

        it('Introductory paragraph should be no more than 6 sentences.', () => {
            const invalid = validInput.replace('Sentence number six.', 'Sentence number six. Sentence number seven.');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Introductory sentence must be no more than 6 sentences.')).toBe(true);
        });

        it('Required metadata: Customer intent', () => {
            const invalid = validInput.replace('# Customer intent: this is the customer intent', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required metadata: Customer intent statement')).toBe(true);
        });

        it('Required sentence after intro paragraph: "In this tutorial"', () => {
            const invalid = validInput.replace('In this tutorial you learn to work with Azure', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required sentence after intro paragraph: "In this tutorial"')).toBe(true);
        });

        it('Checklist is required after paragraph that contains "In this tutorial"', () => {
            const invalid = validInput.replace('[!div class="checklist"]', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Checklist is required after paragraph that contains "In this tutorial"')).toBe(true);
        });

        it('Article must not be introduced as a guide|topic|article', () => {
            const invalid = validInput.replace('In this tutorial', 'In this article');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Article must not be introduced as a guide|topic|article')).toBe(true);
        });

        it('Titles may not start with "Step" followed by a number', () => {
            const invalid = validInput.replace('## Prerequisites', '## Step 1: Prerequisites');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Titles may not start with "Step" followed by a number')).toBe(true);
        });

        it('Next step action formatted link is required after Next steps title', () => {
            const invalid = validInput.replace('nextstepaction', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Next step action formatted link is required after Next steps title')).toBe(true);
        });

    });

});