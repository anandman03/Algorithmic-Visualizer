'use-strict';

function Structure(index1, index2, status) {
    return {
        "firstIndex": index1,
        "secondIndex": index2,
        "status": status
    };
}

function RangeStructure(index, value, status, range) {
    return {
        "index": index,
        "value": value,
        "status": status,
        "range": range
    };
}