/**
 * @author Weston Ruter (@westonruter)
 * @url https://gist.github.com/2052150
 */

function Version(value) {
    this.set(value);
};

/**
 * Update the value of an instance
 * @param {String|Array} value
 */
Version.prototype.set = function (value) {
    if (typeof value === 'string') {
        value = value.split('.');
    }
    // Inspired by http://maymay.net/blog/2008/06/15/ridiculously-simple-javascript-version-string-to-object-parser/
    this.major = parseInt(value[0], 10) || 0;
    this.minor = parseInt(value[1], 10) || 0;
    this.patch = parseInt(value[2], 10) || 0;
};

Version.prototype.toString = function () {
    return [
        this.major,
        this.minor,
        this.patch
    ].join('.');
};

/**
 * Return an array containing the major, minor, and patch
 * @returns {Array}
 */
Version.prototype.valueOf = function () {
    return [
        this.major,
        this.minor,
        this.patch
    ];
};

/**
 * Compare one instance with another
 * @param {Version} that instance to compare with
 * @returns {Number} -1 if this is less than, 0 if equal, +1 if greater than
 */
Version.prototype.cmp = function (that) {
    if( !(that instanceof Version) ){
        throw new TypeError("Cannot compare with value provided.");
    }
    var this_parts = this.valueOf();
    var that_parts = that.valueOf();
    if (this_parts.length !== 3 || this_parts.length !== that_parts.length) {
        throw new TypeError("Expected Version.valueOf to return an array with 3 parts.");
    }

    // Inspired by http://stackoverflow.com/a/6832670/93579
    var i;
    for( i = 0; i <3; i += 1 ){ // I love you
        if (this_parts[i] < that_parts[i]) {
            return -1;
        }
        else if (this_parts[i] > that_parts[i]) {
            return 1;
        }
    }

    // All part pairs are equal
    return 0;
};

/**
 * Less than
 * @param {Version} that instance to compare with
 * @returns {Boolean} true if this is less than that
 */
Version.prototype.lt = function (that) {
    return this.cmp(that) === -1;
};

/**
 * Less than
 * @param {Version} that instance to compare with
 * @returns {Boolean} true if this is greater than that
 */
Version.prototype.gt = function (that) {
    return this.cmp(that) === 1;
};

/**
 * Equals
 * @param {Version} that instance to compare with
 * @returns {Boolean} true if this is equal to that
 */
Version.prototype.eq = function (that) {
    return this.cmp(that) === 0;
};
