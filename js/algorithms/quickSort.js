'use strict';

function getQuickSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    quickSort(array, 0, array.length-1, moves);
    return moves;
};

function quickSort(array, start, end, moves) {
    if(end > start) {
        let pivot = partition(array, start, end, moves);
        quickSort(array, start, pivot-1, moves);
        quickSort(array, pivot+1, end, moves);
    }
};

function partition(array, start, end, moves) {
    let prevIndex = start - 1;
    for(let index = start ; index < end ; ++index) {
        if(index != end) {
            moves.push(Structure(index, end, NO_SWAP));
        }
        if(array[index] < array[end]) {
            ++prevIndex;
            swap(array, index, prevIndex);
            moves.push(Structure(index, prevIndex, SWAP));
        }
    }
    swap(array, prevIndex+1, end);
    moves.push(Structure(end, prevIndex+1, SWAP));
    return prevIndex+1;
};