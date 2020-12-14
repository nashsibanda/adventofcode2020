const input = [
    1003681,
    "23,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,431,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29",
];
const test = [939, "7,13,x,x,59,x,31,19"];

const earliestBus = data => {
    const timestamp = data[0];
    const buses = data[1]
        .split(",")
        .filter(x => x !== "x")
        .map(x => parseInt(x));

    let bestBus = false;
    let i = timestamp;

    busIterator: while (!bestBus) {
        for (let n = 0; n < buses.length; n++) {
            const bus = buses[n];
            if (i % bus === 0) {
                bestBus = bus;
                break busIterator;
            }
        }
        i++;
    }

    return bestBus * (i - timestamp);
};

const earliestConsecutiveTimestamp = data => {
    const timestamp = data[0];
    const numbers = data[1];
    const buses = numbers
        .split(",")
        .filter(x => x !== "x")
        .map(x => parseInt(x));
    const busesAndOffsets = {};
    for (const bus of buses) {
        busesAndOffsets[bus] = numbers.split(",").indexOf(bus.toString());
    }

    let found = false;
    const sortedBuses = buses.sort((a, b) => b - a);
    const largestNum = sortedBuses[0];
    let i = 0 - busesAndOffsets[largestNum];
    let increment = largestNum;
    let incremented = 0;
    const start = new Date();
    allIterator: while (!found) {
        let valid = true;
        let newIncr = increment;
        for (let d = 1 + incremented; d < sortedBuses.length; d++) {
            const bus = sortedBuses[d];
            if ((i + busesAndOffsets[bus]) % bus !== 0) {
                valid = false;
                break;
            }
            newIncr *= bus;
            incremented++;

            console.log(
                "bus:",
                bus,
                "stop:",
                i + busesAndOffsets[bus],
                "diff:",
                (i + busesAndOffsets[sortedBuses[d - 1]]) /
                    (i + busesAndOffsets[bus])
            );
        }
        found = valid;
        increment = newIncr;
        if (!valid) i += increment;
    }

    console.log(new Date() - start, "ms");
    return i;
};

console.log(earliestConsecutiveTimestamp(input)); // CHANGE ME
