const commonRules = require('./commonRules');

const validInput = `
---
title: Azure Functions error handling guidance | Microsoft Docs
description: This is a <TYPE>
services: functions
cloud: 
documentationcenter: 
author: craigshoemaker
manager: jeconnoc

ms.assetid:
ms.service: azure-functions
ms.devlang: multiple
ms.topic: conceptual
ms.date: 02/01/2018
ms.author: cshoe

# Customer intent: This is a customer intent statement
---

# Azure Functions error handling

This topic provides general guidance for handling errors that occur when your functions execute. It also provides links to the topics that describe binding-specific errors that may occur. 

In this tutorial you learn new and wonderful things!

## Next steps

> [!div class="nextstepaction"]
> [Azure Windows virtual machine tutorials](./tutorial-manage-vm.md)
`;

describe('commonRules => ', () => {

    it('stringBefore ', () => {
        const original = 'first second';
        const isFirst = commonRules.stringBefore(original, 'first', 'second');
        expect(isFirst).toBe(true);
    });

    it('Require customer intent statement', () => {
        const invalid = validInput.replace('# Customer intent', '');
        const results = commonRules.requireCustomerIntent(invalid);
        expect(results).toBe(false);
    });

    it('Require keyword in metadata description', () => {
        const invalid = validInput.replace('description: This is a <TYPE>', 'description: This is a foo article');
        const results = commonRules.requireKeywordInMetadataDescription(invalid, 'bar');
        expect(results).toBe(false);
    });

    it('Require keyword in metadata title', () => {
        const invalid = validInput.replace('title: Azure Functions', 'title: Foo Functions');
        const results = commonRules.requireKeywordInMetadataDescription(invalid, 'Azure');
        expect(results).toBe(false);
    });

    it('Require keyword in first sentence after first paragraph', () => {
        const invalid = validInput.replace('In this tutorial', 'In this foo');
        const results = commonRules.requireKeywordInFirstSentenceAfterFirstParagraph(invalid, 'tutorial');
        expect(results).toBe(false);
    });

    it('Do not introduce doc as guide|topic|article', () => {
        const invalid = validInput.replace('In this tutorial', 'In this guide');
        const results = commonRules.disallowUseOfAlternateArticleDescriptors(invalid);
        expect(results).toBe(false);
    });

    it('Titles may not start with "Step" followed by a number', () => {
        const invalid = validInput.replace('# Azure Functions error handling', '## Step 9: Azure Functions error handling');
        const results = commonRules.disallowTitlesPrefixedByStep(invalid);
        expect(results).toBe(false);
    });

    it('Titles may not start with "Step" followed by a number (string)', () => {
        const invalid = validInput.replace('# Azure Functions error handling', '## Step Eight: Azure Functions error handling');
        const results = commonRules.disallowTitlesPrefixedByStep(invalid);
        expect(results).toBe(false);
    });

    it('Next step action formatted link is required after Next steps title', () => {
        const invalid = validInput.replace('nextstepaction', '');
        const results = commonRules.requireNextStepActionFormattedLink(invalid);
        expect(results).toBe(false);
    });

});