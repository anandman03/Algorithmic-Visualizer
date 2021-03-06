'use strict';

function getSelectionSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    for(let index = 0 ; index < array.length ; ++index) {
        let minIndex = index;
        for(let ptr = index + 1 ; ptr < array.length ; ++ptr) {
            if(array[ptr] < array[minIndex]) {
                minIndex = ptr;
            }
            moves.push([minIndex, ptr, NO_SWAP]);
        }
        swap(array, minIndex, index);
        moves.push([minIndex, index, SWAP]);
    }
    return moves;
};