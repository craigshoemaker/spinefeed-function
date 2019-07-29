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

[yaml](./test.yml)

[test](http://docs.microsoft.com/articles/cosmos-db/table-storage-cloud-service-nodejs)

[bookmark](#bookmark)

![screenshot](../media/logo.png)

[email](mailto:test@test.com)

[relative](./doc.md)

[yml](./file.yml)

![jpg](./media/screenshot.jpg)

![png](./media/screenshot.png)

![gif](./media/screenshot.gif)



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

        it('relative links with toc location', () => {
            const invalid = validInput.replace(/\.md/g, '.md?toc=%2fcli%2fazure%2ftoc.json');
            const results = generalRules.apply(invalid);
            expect(results.brokenRules.includes('Relative links must end with the ".md" extension')).toBe(false);
        });

        it('mailto links to email addresses', () => {
            const valid = validInput.replace('[yaml](./test.yml)', '[email](mailto:test@test.com)');
            const results = generalRules.apply(valid);
            expect(results.brokenRules.includes('Relative links must end with the ".md" extension')).toBe(false);
        });

        it('code blocks that resemble relative links', () => {
            const valid = validInput.replace('[yaml](./test.yml)', 'return!0!==c&&t["_"+r]({message:e,url:n,lineNumber:i,columnNumber:a,error:s}),c},');
            const results = generalRules.apply(valid);
            expect(results.brokenRules.includes('Relative links must end with the ".md" extension')).toBe(false);
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