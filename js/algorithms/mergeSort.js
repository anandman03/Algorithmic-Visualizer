'use strict';

function getMergeSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    mergeSort(array, 0, array.lenght - 1);
    return moves;
};

function mergeSort(array, start, end) {
    if(start < end) {
        let mid = Math.floor((end + start) / 2);
        mergeSort(array, start, mid);
        mergeSort(array, mid+1, end);
        merge(array, start, mid, end);
    }
    return;
};

function merge(array, start, mid, end) {
    let sortArray = [];
    let fptr = start, bptr = mid+1;
    while(fptr <= mid && bptr <= end) {
        if(array[fptr] < array[bptr]) {
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
    }
    return;
};