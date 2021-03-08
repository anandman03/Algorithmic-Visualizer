'use strict';

// import the constants
document.write('<script type="text/javascript" src="./js/constants.js"></script>');

// importing algorithms
document.write('<script type="text/javascript" src="./js/algorithms/bubbleSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/selectionSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/insertionSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/mergeSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/heapSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/quickSort.js"></script>');
document.write('<script type="text/javascript" src="./js/algorithms/twistSort.js"></script>');

// importing helpers
document.write('<script type="text/javascript" src="./js/helpers/swap.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/sleep.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/clearScreen.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/getIntegerList.js"></script>');


window.onload = updateScreenContent;
document.querySelector(".sizeMenu").onchange = updateScreenContent;

// For updating screen on every size change
function updateScreenContent() {
    console.log("Selected");
    let sizeFieldValue = document.querySelector(".sizeMenu").value;
    sizeFieldValue = (sizeFieldValue == 0) ? 30 : sizeFieldValue;

    clearScreen();
    
    let list = generateList(sizeFieldValue);
    const collection = document.querySelector(".array");
    for(const element of list) {
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
        case 0: alert("No Algorithm Selected.");
            return;
        case 1: moves = getBubbleSortMoves(list);
            break;
        case 2: moves = getSelectionSortMoves(list);
            break;
        case 3: moves = getInsertionSortMoves(list);
            break;
        case 4: moves = getMergeSortMoves(list);
            break;
        case 5: moves = getQuickSortMoves(list);
            break;
        case 6: moves = getHeapSortMoves(list);
            break;
        case 7: moves = getTwistSortMoves(list);
            break;
        default: break;
    }
    visualisationHandler(list, moves);
};

function visualisationHandler(list, moves) {
    if(moves.length === 0) {
        markallVisited(list);
        return;
    }
    else if(moves[0].length === 3) {
        singularVisualisation(list, moves);
    }
    else {
        rangeVisualisation(list, moves);
    }
};

// Visualization functions for range props starts.
async function rangeVisualisation(list, moves) {
    await updateRange(list, moves[0][3], "cell current");
    let prevRangeStart = moves[0][3][0], prevRangeEnd = moves[0][3][1];
    // keep looping until the range of updation changes.
    while(moves.length && moves[0].length == 4 && prevRangeStart == moves[0][3][0] && prevRangeEnd == moves[0][3][1]) {
        let index = moves[0][0], value = Number(moves[0][1]);
        list[index].setAttribute("value", value);
        list[index].style.height = `${4*value}px`;
        moves.shift();
    }
    await updateRange(list, [prevRangeStart, prevRangeEnd], "cell");

    // moves.shift();
    visualisationHandler(list, moves);
};

async function updateRange(list, indexes, className) {
    await sleep();
    for(let index = indexes[0] ; index <= indexes[1] ; ++index) {
        list[index].setAttribute("class", className);
    }
    await sleep();
};
// Visualization functions for range props end.

// Visualization functions for swap props starts.
async function singularVisualisation(list, moves) {
    await updateClass(list, moves[0][0], moves[0][1], "cell current");
    if(moves[0][2] == SWAP) {
        await swapVisualisation(list, moves[0][0], moves[0][1]);
    }
    await updateClass(list, moves[0][0], moves[0][1], "cell");

    moves.shift();
    visualisationHandler(list, moves);
};

async function swapVisualisation(list, index1, index2) {
    let indexOneValue = list[index1].getAttribute("value");
    let indexTwoValue = list[index2].getAttribute("value");

    list[index1].setAttribute("value", indexTwoValue);
    list[index1].style.height = `${4*indexTwoValue}px`;

    list[index2].setAttribute("value", indexOneValue);
    list[index2].style.height = `${4*indexOneValue}px`;
};

async function markallVisited(list) {
    for(let index = 0 ; index < list.length ; ++index) {
        await list[index].setAttribute("class", "cell done");
    }
};

async function updateClass(list, index1, index2, className) {
    await sleep();
    list[index1].setAttribute("class", className);
    list[index2].setAttribute("class", className);
    await sleep();
};
// Visualization functions for swap props ends.