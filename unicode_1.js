var msg1 = "Crystal Key";
var msg2 = "Orb of Osuvox";

var halliday = message => {
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    var output = "";

    for (var i = 0; i < message.length; i++) {
        var messageChar = message[i];
        if (alpha.includes(messageChar.toLowerCase())) {
            var newIdx =
                (alpha.indexOf(messageChar.toLowerCase()) + 13) % alpha.length;
            var encChar = alpha[newIdx];
            output +=
                messageChar === messageChar.toUpperCase()
                    ? encChar.toUpperCase()
                    : encChar;
        } else {
            output += messageChar;
        }
    }

    return output;
};

console.log(halliday(msg1));
console.log(halliday(msg2));
