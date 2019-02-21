const commonRules = require('./commonRules');

const validInput = `
---
title: Azure Functions error handling guidance | Microsoft Docs
description: Provides general guidance for handling errors that occur in when your functions execute, and links to binding-specific errors topics.
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

});