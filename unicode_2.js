devvie = function (input) {
    var position = [0, 0];
    var dirs = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];
    var currentDirIdx = 0;

    for (var char of input) {
        switch (char) {
            case "L":
                currentDirIdx = (currentDirIdx + 4 - 1) % dirs.length;
                continue;
            case "R":
                currentDirIdx = (currentDirIdx + 4 + 1) % dirs.length;
                continue;
            case "F":
                position[0] += dirs[currentDirIdx][0];
                position[1] += dirs[currentDirIdx][1];
            default:
                continue;
        }
    }

    var moves = 0;
    while (true) {
        if (position.every(p => p === 0)) return moves;
        if (closer(position, dirs[currentDirIdx])) {
            position[0] += dirs[currentDirIdx][0];
            position[1] += dirs[currentDirIdx][1];
            moves++;
        } else if (closer(position, dirs[currentDirIdx + 1])) {
            currentDirIdx = (currentDirIdx + 4 + 1) % dirs.length;
            moves++;
        } else {
            currentDirIdx = (currentDirIdx + 4 - 1) % dirs.length;
            moves++;
        }
    }
};

var closer = function (pos, move) {
    var newPos = [pos[0] + move[0], pos[1] + move[1]];
    if (
        Math.abs(newPos[0]) > Math.abs(pos[0]) ||
        Math.abs(newPos[1]) > Math.abs(pos[1])
    )
        return false;
    return true;
};

console.log(devvie("RF")); // 3
console.log(devvie("LFRFRFR")); // 1
console.log(devvie("FxLxLxFx")); // 0
