'use strict';

function getInsertionSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    for(let index = 0 ; index < array.length ; ++index) {
        let ptr = index - 1;
        while(ptr >= 0 && array[ptr] > array[ptr + 1]) {
            moves.push(Structure(ptr, ptr + 1, SWAP));
            swap(array, ptr + 1, ptr);
            ptr -= 1;
        }
    }
    return moves;
};