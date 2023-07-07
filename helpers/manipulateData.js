exports.displayNumberWithPrefix = function(number) {
    var prefix = '';
    var maxNumber = 999; // Set the maximum number to determine the prefix length
    var prefixLength = String(maxNumber).length;

    if (number <= maxNumber) {
        var numberOfZeros = prefixLength - String(number).length;
        prefix = '0'.repeat(numberOfZeros);
    }

    return (prefix + number);
}
