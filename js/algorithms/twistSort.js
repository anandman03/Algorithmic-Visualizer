'use strict';

function getTwistSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    twistSort(array, 0, array.length - 1, moves);
    return moves;
};

function twistSort(array, start, end, moves) {
    if(end > start) {
        if(end - start <= 10) {
            performInsertionSort(array, start, end, moves);
        }
        else {
            let mid = start + Math.floor((end - start) / 2);
            mergeSort(array, start, mid, moves);
            mergeSort(array, mid+1, end, moves);
            merge(array, start, mid, end, moves);
        }
    }
};

function performInsertionSort(array, start, end, moves) {
    for(let index = start ; index <= end ; ++index) {
        let ptr = index - 1;
        while(ptr >= start && array[ptr] > array[ptr + 1]) {
            moves.push(Structure(ptr, ptr + 1, SWAP));
            swap(array, ptr + 1, ptr);
            ptr -= 1;
        }
    }
    return moves;
};