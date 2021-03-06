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
document.write('<script type="text/javascript" src="./js/helpers/structure.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/clearScreen.js"></script>');
document.write('<script type="text/javascript" src="./js/helpers/getIntegerList.js"></script>');

let speed = 1;

window.onload = updateScreenContent;
document.querySelector(".sizeMenu").onchange = updateScreenContent;
document.querySelector(".speedMenu").onchange = function() {
    speed = Number(document.querySelector(".speedMenu").value);
};

// For updating screen on every size change
function updateScreenContent() {
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
    else if(moves[0].status === SWAP || moves[0].status === NO_SWAP) {
        singularVisualisation(list, moves);
    }
    else {
        rangeVisualisation(list, moves);
    }
};

// Visualization functions for range props starts.
async function rangeVisualisation(list, moves) {
    await updateRange(list, moves[0].range, "cell current");
    let prevRangeStart = moves[0].range[0], prevRangeEnd = moves[0].range[1];
    // keep looping until the range of updation changes.
    while(moves.length && moves[0].status == CHANGE_VALUE && prevRangeStart == moves[0].range[0] && prevRangeEnd == moves[0].range[1]) {
        let index = moves[0].index, value = Number(moves[0].value);
        list[index].setAttribute("value", value);
        list[index].style.height = `${4*value}px`;
        moves.shift();
    }
    await updateRange(list, [prevRangeStart, prevRangeEnd], "cell");

    // moves.shift();
    visualisationHandler(list, moves);
};

async function updateRange(list, indexes, className) {
    await sleep(speed);
    for(let index = indexes[0] ; index <= indexes[1] ; ++index) {
        list[index].setAttribute("class", className);
    }
    await sleep(speed);
};
// Visualization functions for range props end.

// Visualization functions for swap props starts.
async function singularVisualisation(list, moves) {
    await updateClass(list, moves[0].firstIndex, moves[0].secondIndex, "cell current");
    if(moves[0].status == SWAP) {
        await swapVisualisation(list, moves[0].firstIndex, moves[0].secondIndex);
    }
    await updateClass(list, moves[0].firstIndex, moves[0].secondIndex, "cell");

    moves.shift();
    visualisationHandler(list, moves);
};

// Swap Bars
async function swapVisualisation(list, firstIndex, secondIndex) {
    let indexOneValue = list[firstIndex].getAttribute("value");
    let indexTwoValue = list[secondIndex].getAttribute("value");

    list[firstIndex].setAttribute("value", indexTwoValue);
    list[firstIndex].style.height = `${4*indexTwoValue}px`;

    list[secondIndex].setAttribute("value", indexOneValue);
    list[secondIndex].style.height = `${4*indexOneValue}px`;
};

// Mark all bars Green
async function markallVisited(list) {
    for(let index = 0 ; index < list.length ; ++index) {
        await list[index].setAttribute("class", "cell done");
    }
};

async function updateClass(list, firstIndex, secondIndex, className) {
    list[firstIndex].setAttribute("class", className);
    list[secondIndex].setAttribute("class", className);
    await sleep(speed);
};
// Visualization functions for swap props ends.