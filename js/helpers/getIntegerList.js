'use strict';

function getNumericalValues(list) {
    let values = [];
    for(let index = 0 ; index < list.length ; ++index) {
        values.push(list[index].getAttribute("value"));
        values[index] = Number(values[index]);
    }
    return values;
};