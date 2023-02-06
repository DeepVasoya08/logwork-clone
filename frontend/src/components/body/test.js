// An async task. Pretend it's doing something more useful
// in practice.
function delayedValue(time, value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), time);
    });
}

async function* generate() {
    yield delayedValue(2000, 1);
    yield delayedValue(100, 2);
    yield delayedValue(500, 3);
    yield delayedValue(250, 4);
    yield delayedValue(125, 5);
    yield delayedValue(50, 6);
    console.log('All done!');
}

async function main() {
    for await (const value of generate()) {
        console.log('value', value);
    }
}

main()
    .catch((e) => console.error(e));
