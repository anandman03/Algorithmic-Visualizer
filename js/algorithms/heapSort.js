'use strict';

function getHeapSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    for(let index = array.length - 1 ; index >= 0 ; --index) {
        heapify(array, length, index, moves);
    }
    for(let index = array.length - 1 ; index >= 0 ; --index) {
        moves.push([index, 0, SWAP]);
        swap(array, index, 0);
        heapify(array, index, 0, moves);
    }
    console.log(array);
    return moves;
};

function heapify(array, length, index, moves) {
    let largest = index, left = 2*index + 1, right = 2*index + 2;
    if(left < length && array[left] > array[largest]) {
        largest = left;
    }
    if(right < length && array[right] > array[largest]) {
        largest = right;
    }
    if(largest != index) {
        moves.push([index, largest, SWAP]);
        swap(array, index, largest);
        heapify(array, length, largest, moves);
    }
};