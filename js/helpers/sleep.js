async function sleep(speed) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(); }, 450 / speed);
    });
};