'use strict';

// import the constants
document.write('<script type="text/javascript" src="./js/constants.js"></script>');

// importing algorithms
document.write('<script type="text/javascript" src="./js/algorithms/bubbleSort.js"></script>');

// importing helpers
document.write('<script type="text/javascript" src="./js/helpers/swap.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/sleep.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/clearScreen.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/getIntegerList.js"></script>');


window.onload = updateScreenContent;

// For updating screen on every size change
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

// for generating random list of integers
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

        case 1:
            moves = getSelectionSortMoves(list);
            break;

        default:
            break;
    }
    visualisation(list, moves);
}

async function visualisation(list, moves) {
    for(let i = 0 ; i < moves.length ; ++i) {
        if(moves[i][2] == SWAP) {
            await swapVisualisation(list, moves[i][0], moves[i][1]);
        }
        else {
            await highlightVisualisation(list, moves[i][0], moves[i][1]);
        }
    }
    markallVisited(list);
};

async function swapVisualisation(list, index1, index2) {
    await updateClass(list, index1, index2, "cell current");
    
    let indexOneValue = list[index1].getAttribute("value");
    let indexTwoValue = list[index2].getAttribute("value");

    list[index1].setAttribute("value", indexTwoValue);
    list[index1].style.height = `${4*indexTwoValue}px`;

    list[index2].setAttribute("value", indexOneValue);
    list[index2].style.height = `${4*indexOneValue}px`;

    await updateClass(list, index1, index2, "cell");
};

async function highlightVisualisation(list, index1, index2) {
    await updateClass(list, index1, index2, "cell current");
    await updateClass(list, index1, index2, "cell");
};

async function markallVisited(list) {
    for(let index = 0 ; index < list.length ; ++index) {
        await list[index].setAttribute("class", "cell done");
    }
}

async function updateClass(list, index1, index2, className) {
    await sleep();
    list[index1].setAttribute("class", className);
    list[index2].setAttribute("class", className);
    await sleep();
};