async function sleep(speed) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, Math.round(450 / speed));
    });
};