const generalRules = require('./generalRules');

const validInput = `
---
title: Reacting to Azure Blob Storage events | Microsoft Docs
description: Use Azure Event Grid to subscribe to Blob Storage events. 
services: storage,event-grid 
keywords: 
author: cbrooksmsft
ms.author: cbrooks
ms.date: 01/30/2018
ms.topic: article
ms.service: storage
# Customer intent: this is the customer intent
---

# Reacting to Blob Storage events

[test](../../articles/cosmos-db/table-storage-cloud-service-nodejs.md)

[test](~/articles/cosmos-db/table-storage-cloud-service-nodejs.md)

[test](http://docs.microsoft.com/articles/cosmos-db/table-storage-cloud-service-nodejs)

![screenshot](../media/logo.png)

`;


describe('general rules => ', () => {

    describe('passes: ', () => {

        it('valid document passes all rules', () => {
            const result = generalRules.apply(validInput);
            expect(result.total).toEqual(result.passed);
            expect(result.allPassed).toBe(true);
        });

        it('no blank like between metadata and H1 title', () => {
            const valid = validInput.replace(/---\n\n\#/, '---\n#');
            const results = generalRules.apply(valid);
            expect(results.brokenRules.includes('H1 title must immediately follow metadata')).toBe(false);
        });

    });

    describe('fails', () => {

        it('text before H1 title', () => {
            const invalid = validInput.replace('# Reacting', 'this is a test\n# Reacting');
            const results = generalRules.apply(invalid);
            expect(results.brokenRules.includes('H1 title must immediately follow metadata')).toBe(true);
        });

        it('missing metadata', () => {
            const invalid = validInput.substr(validInput.lastIndexOf('---'));
            const results = generalRules.apply(invalid);
            expect(results.brokenRules.includes('Document must include metadata')).toBe(true);
        });

        it('relative links do not end with ".md"', () => {
            const invalid = validInput.replace(/\.md/g, '');
            const results = generalRules.apply(invalid);
            expect(results.brokenRules.includes('Relative links must end with the ".md" extension')).toBe(true);
        });
    });

});