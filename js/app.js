'use strict';

document.write('<script type="text/javascript" src="./js/bubbleSort.js"></script>');

function updateScreenContent() {
    let sizeFieldValue = document.querySelector(".sizeMenu").value;
    sizeFieldValue = (sizeFieldValue == 0) ? 30 : sizeFieldValue;

    let list = generateList(sizeFieldValue);
    const collection = document.querySelector(".array");
    for(const element of list)
    {
        const node = document.createElement("div");
        node.setAttribute("class", "cell");
        node.setAttribute("value", String(element));
        node.style.height = `${4*element}px`;
        collection.appendChild(node);
    }
};

function generateList(length) {
    let list = [];
    let lowerBound = 1, upperBound = 100;

    for (let counter = 0; counter < length ; ++counter) {
        let randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
        list.push(parseInt(randomNumber));
    }
    return list;
};