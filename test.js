function debounce(func, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
    };
}

let debouncedLog = debounce(console.log, 100);

for (let i = 0; i < 1000; i++) {
    debouncedLog(i);
}