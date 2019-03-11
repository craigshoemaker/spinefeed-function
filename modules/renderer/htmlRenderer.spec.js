const rules = require('../validationRules')
const renderer = require('./htmlRenderer');

const input = `---
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

## Prerequisites

## Download the sample application

NOT_A_CHECKLIST

## Clean up resources
this is a test

## Next steps
> [!div class="nextstepaction"]
> [Azure Windows virtual machine tutorials](./tutorial-manage-vm.md)`;

const output = 'html';
const rulesResult = rules.apply(input, 'quickstart');

describe('htmlRenderer => ', () => {

    describe('render => ', () => {

        it('renders HTML markup', () => {
            const result = renderer.render(rulesResult, output);
            expect(/<.*?>/.test(result.string)).toBe(true);            
        });

    });

});