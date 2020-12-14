const input = [
    114,
    51,
    122,
    26,
    121,
    90,
    20,
    113,
    8,
    138,
    57,
    44,
    135,
    76,
    134,
    15,
    21,
    119,
    52,
    118,
    107,
    99,
    73,
    72,
    106,
    41,
    129,
    83,
    19,
    66,
    132,
    56,
    32,
    79,
    27,
    115,
    112,
    58,
    102,
    64,
    50,
    2,
    39,
    3,
    77,
    85,
    103,
    140,
    28,
    133,
    78,
    34,
    13,
    61,
    25,
    35,
    89,
    40,
    7,
    24,
    33,
    96,
    108,
    71,
    11,
    128,
    92,
    111,
    55,
    80,
    91,
    31,
    70,
    101,
    14,
    18,
    12,
    4,
    84,
    125,
    120,
    100,
    65,
    86,
    93,
    67,
    139,
    1,
    47,
    38,
];

const test = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const testTwo = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
];

const sorted = test.sort((a, b) => a - b); // CHANGE ME

const findDifferences = joltages => {
    const diffs = { 3: 1, 2: 0, 1: 0 };
    for (let i = 0; i < sorted.length; i++) {
        const number = sorted[i];
        if (i === 0) {
            const diff = number.toString();
            diffs[diff] += 1;
        } else {
            const prev = sorted[i - 1];
            const diff = (number - prev).toString();
            diffs[diff] += 1;
        }
    }
    return diffs;
};

const testThree = [4, 3, 2, 1];

const revSorted = input.sort((a, b) => b - a); // CHANGE ME
revSorted.unshift(revSorted[0] + 3);
revSorted.push(0);
const arrangements = [];
const arrHash = {};

const findArrangementsRecurse = (joltages, path = []) => {
    const currentPath = [];
    for (let i = 0; i < path.length; i++) {
        const element = path[i];
        currentPath.push(element);
    }

    const currentNode = joltages[0];
    currentPath.push(currentNode);
    const lastNode = currentPath[currentPath.length - 1];
    if (lastNode === 0) {
        arrangements.push(currentPath);
        console.log(arrangements.length);
        return;
    }

    const smallerNodes = joltages.slice(1);
    const children = [];
    for (let i = 0; i < smallerNodes.length; i++) {
        const comp = smallerNodes[i];
        if (currentNode - comp <= 3) {
            children.push(comp);
        } else {
            break;
        }
    }

    for (let j = 0; j < children.length; j++) {
        const child = children[j];
        const sliceIdx = smallerNodes.indexOf(child);
        findArrangementsRecurse(smallerNodes.slice(sliceIdx), currentPath);
    }
    return;
};

const allSmallGaps = arr => {
    let valid = true;
    for (let i = 0; i < arr.length - 1; i++) {
        const num = arr[i];
        const next = arr[i + 1];
        if (num - next > 3) {
            valid = false;
            break;
        }
    }
    return valid;
};

const seen = {};

const findChunkPaths = arr => {
    if (seen[arr]) return 0;
    if (!allSmallGaps(arr)) return 0;
    if (arr.length < 3) return 1;
    let paths = 0;
    if (allSmallGaps(arr)) paths += 1;
    for (let i = 1; i < arr.length - 1; i++) {
        const idx = i;
        for (let j = 1; j < arr.length - i; j++) {
            const toRemove = j;
            const newArr = [...arr];
            newArr.splice(idx, toRemove);
            if (newArr.length > 3) {
                paths += findChunkPaths(newArr);
                seen[newArr] = true;
            } else {
                if (!seen[newArr] && allSmallGaps(newArr)) {
                    paths++;
                }
                seen[newArr] = true;
            }
        }
    }
    return paths;
};

const chunks = [];
for (let i = 1; i < revSorted.length; i++) {
    const element = revSorted[i];
    const prev = revSorted[i - 1];
    if (prev - element === 3) {
        if (chunks.length < 1) {
            chunks.push([prev], [element]);
        } else {
            chunks.push([element]);
        }
    } else {
        chunks[chunks.length - 1].push(element);
    }
}

const gapMap = chunks.map(chunk => findChunkPaths(chunk));
const paths = gapMap.reduce((cur, acc) => cur * acc, 1);
console.log(chunks);
console.log(gapMap);
console.log(paths);

const findArrangementsRecurseTwo = (joltages, currentPaths = 1) => {
    const currentNode = joltages[0];
    const currentKey = currentNode;
    const nextNode = joltages[1];
    if (nextNode === 0) {
        arrHash[joltages] = currentPaths;
        return 1;
    }

    if (arrHash[joltages]) {
        return arrHash[joltages] * currentPaths;
    }

    const smallerNodes = joltages.slice(1);
    const children = [];
    for (let i = 0; i < smallerNodes.length; i++) {
        const comp = smallerNodes[i];
        if (currentNode - comp <= 3) {
            children.push(comp);
        } else {
            break;
        }
    }

    let val = 0;
    for (let j = 0; j < children.length; j++) {
        const child = children[j];
        const sliceIdx = smallerNodes.indexOf(child);
        val += findArrangementsRecurseTwo(
            smallerNodes.slice(sliceIdx),
            currentPaths
        );
    }
    arrHash[joltages] = val * children.length;
    return val * currentPaths;
};
