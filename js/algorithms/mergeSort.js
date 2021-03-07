'use strict';

function getMergeSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    mergeSort(array, 0, array.length - 1, moves);
    return moves;
};

function mergeSort(array, start, end, moves) {
    if(start < end) {
        let mid = start + Math.floor((end - start) / 2);
        mergeSort(array, start, mid, moves);
        mergeSort(array, mid+1, end, moves);
        merge(array, start, mid, end, moves);
    }
};

function merge(array, start, mid, end, moves) {
    let sortArray = [];
    let fptr = start, bptr = mid + 1;
    while(fptr <= mid && bptr <= end) {
        if(array[fptr] <= array[bptr]) {
            sortArray.push(array[fptr++]);
        }
        else {
            sortArray.push(array[bptr++]);
        }
    }
    while(fptr <= mid) sortArray.push(array[fptr++]);
    while(bptr <= end) sortArray.push(array[bptr++]);

    for(let index = start ; index <= end ; ++index) {
        array[index] = sortArray[index - start];
        moves.push([index, array[index], CHANGE_VALUE, [start, end]]);
    }
};