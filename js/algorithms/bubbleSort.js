'use strict';

function getBubbleSortMoves(list) {
    let moves = [];
    let array = getNumericalValues(list);

    for(let counter = 0 ; counter < (list.length - 1) ; ++counter) {
        for(let index = 0 ; index < (list.length - counter - 1) ; ++index) {
            if(array[index] > array[index + 1]) {
                swap(array, index, index + 1);
                moves.push([index, index + 1, SWAP]);
            }
            else {
                moves.push([index, index + 1, NO_SWAP]);
            }
        }
    }
    return moves;
};