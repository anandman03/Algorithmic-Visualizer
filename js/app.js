'use strict';

// importing algorithms
document.write('<script type="text/javascript" src="./js/bubbleSort.js"></script>');
document.write('<script type="text/javascript" src="./js/constants.js"></script>');

// importing helpers
document.write('<script type="text/javascript" src="./js/helpers/swap.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/clearScreen.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/getIntegerList.js"></script>');


window.onload = updateScreenContent;

function updateScreenContent() {
    let sizeFieldValue = document.querySelector(".sizeMenu").value;
    sizeFieldValue = (sizeFieldValue == 0) ? 30 : sizeFieldValue;

    clearScreen();
    
    let list = generateList(sizeFieldValue);
    const collection = document.querySelector(".array");
    for(const element of list)
    {
        const node = document.createElement("div");
        node.setAttribute("class", "cell");
        node.setAttribute("value", element);
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

function startAlgorithm() {
    let list = document.querySelectorAll(".cell");
    let moves = [];

    let algorithmType = Number(document.querySelector(".algoMenu").value);
    switch (algorithmType) {
        case 0:
            console.log("Not proven !!");

        case 1:
            moves = getBubbleSortMoves(list);
            break;

        default:
            break;
    }
    console.log(moves);
}

// function visualisation() {

// };