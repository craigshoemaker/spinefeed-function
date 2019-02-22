const rules = require('./quickstartRules');

const validInput = `
---
title: Azure Quickstart - Upload, download, and list blobs in Azure Storage using Node.js | Microsoft Docs
description: In this quickstart you create a storage account and a container. Then you use the storage client library for Node.js to upload a blob to Azure Storage, download a blob, and list the blobs in a container.
services: storage
author: craigshoemaker
manager: jeconnoc

ms.custom: mvc
ms.service: storage
ms.topic: quickstart
ms.date: 03/15/2018
ms.author: cshoe

# Customer intent: this is the customer intent
---

# Quickstart: Sample quickstart

To complete this quickstart, you need an [Azure subscription](https://azure.microsoft.com/free/?WT.mc_id=A261C142F)

In this quickstart, many good things happen.

## Download the sample application

NOT_A_CHECKLIST

## Clean up resources
this is a test

## Next steps`;

describe('quickstartRules => ', () => {

    describe('passes: ', () => {

        it('valid document passes all rules', () => {
            const result = rules.apply(validInput);
            expect(result.total).toEqual(result.passed);
            expect(result.allPassed).toBe(true);
        });
    });

    describe('fails: ', () => {

        it('title has a lowercase "q" in "Quickstart"', () => {
            const invalid = validInput.replace('Quickstart: ', 'quickstart: ');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('H1 format must be: "Quickstart: "')).toBe(true);
        });

        it('title has no space after "Quickstart:"', () => {
            const invalid = validInput.replace('Quickstart: ', 'Quickstart:');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('H1 format must be: "Quickstart: "')).toBe(true);
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

        it('free account link comes after first H2', () => {
            const invalid = validInput.replace('# Quickstart: Sample quickstart', '# Quickstart: Sample quickstart\n## Download sample application');
            const results = rules.apply(invalid);
            expect(results.allPassed).toBe(false);
        });

        it('metadata "ms.topic: quickstart" is missing', () => {
            const invalid = validInput.replace('ms.topic: quickstart', 'ms.topic: tutorial');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('"mstopic: quickstart" is required in metadata')).toBe(true);
        });

        it('includes a checklist', () => {
            const invalid = validInput.replace('NOT_A_CHECKLIST', '<div class="checklist"></div>');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Checklists are not allowed in a quickstart')).toBe(true);
        });

        it('missing link to free account', () => {
            const invalid = validInput.replace('azure.microsoft.com/free', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Link to free Azure account must come before first H2')).toBe(true);
        });

        it('Required metadata: Customer intent', () => {
            const invalid = validInput.replace('# Customer intent: this is the customer intent', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required metadata: Customer intent statement')).toBe(true);
        });

        it('Metadata description does not include "quickstart"', () => {
            const invalid = validInput.replace('description: In this quickstart', 'description: ');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('The word "quickstart" must appear in metadata description')).toBe(true);
        });

        it('Metadata title does not include "quickstart"', () => {
            const invalid = validInput.replace('title: Azure Quickstart', 'title: Azure Foo');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('The word "quickstart" must appear in metadata title')).toBe(true);
        });

        it('Required sentence after intro paragraph: "In this quickstart"', () => {
            const invalid = validInput.replace('In this quickstart, many good things happen.', '');
            const results = rules.apply(invalid);
            expect(results.brokenRules.includes('Required sentence after intro paragraph: "In this quickstart"')).toBe(true);
        });
    });

});