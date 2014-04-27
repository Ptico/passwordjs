(function(global) {
  'use strict';

  var Password = {},
      utils;

  /**
   * Generate random password string
   *
   *     Password.generate(); // Generate password with default options
   *     Password.generate(10); // Generate password with length of 10 chars
   *     Password.generate([8, 12]); // Generate password with length 8 to 12 chars
   *     Password.generate(10, { specials: 3 }); // Generate password containing 3 special chars
   *
   * @param {Number|Array} [length]           Length of generated password. Default: [7, 10]
   * @param {Object}       [options]          Options
   * @param {Number}       [options.specials] Quantity of special chars in the password. Default: 1
   * @param {Number}       [options.nums]     Quantity of numbers in the password. Default: 2
   * @param {Number}       [options.uppers]   Quantity of uppercase symbols. Default: 2
   * @param {Number}       [options.lowers]   Quantity of lowercase symbols. Default: 3
   */
  Password.generate = function(length, options) {
    var tmp = [],
        defaults = Password.defaults,
        nums, specials, uppers, lowers;

    // Default values for arguments
    if (typeof(length) == 'undefined') length = defaults.length;
    if (length instanceof Array) length = utils.random(length[1], length[0]);
    options = options || {};

    // Assign quantity of different types
    specials = getOptionNum(options.specials, defaults.specials, length);
    length = getRest(length, specials);

    nums = getOptionNum(options.nums, defaults.nums, length);
    length = getRest(length, nums);

    uppers = getOptionNum(options.uppers, defaults.uppers, length);
    length = getRest(length, uppers);

    lowers = getOptionNum(options.lowers, defaults.lowers, length);
    length = getRest(length, lowers);

    // Make an array of symbols
    while(specials--) tmp.push(utils.special());
    while(nums--)     tmp.push(utils.random(9).toString());
    while(uppers--)   tmp.push(utils.upperChar());
    while(lowers--)   tmp.push(utils.lowerChar());
    while(length--)   tmp.push(utils.anyChar());

    // Shuffle the array and make a string
    return utils.shuffle(tmp).join('');
  };

  /**
   * Get password complexity score
   *
   *     Password.score('badpass'); //=> 9
   *     Password.score('M)f$you8Ag'); //=> 27
   *
   * @param {String} password Password
   *
   * @returns {Number} Password complexity score
   */
  Password.score = function(password) {
    var chars = splitChars(password),
        bonus = bonusScore(chars);

    return chars.total + bonus;
  };

  /**
   * Get password complexity rank (from 0 to 5)
   *
   *     Password.rank('badpass'); //=> 0
   *     Password.rank('N0tSobad'); //=> 2
   *     Password.rank('M)f$you8Ag'); //=> 4
   *
   * @param {String} password Password
   *
   * @returns {Number} Password complexity rank
   */
  Password.rank = function(password) {
    var score = Password.score(password);

    if (score <= 11) return 0;
    else if (score < 15) return 1;
    else if (score < 19) return 2;
    else if (score < 23) return 3;
    else if (score < 28) return 4;
    else return 5;
  };

  Password.Utils = utils = {

    /**
     * Shuffle array values using Fisher-Yates algorithm
     *
     * @param {Array} array Source array
     *
     * @returns {Array} Shuffled array
     */
    shuffle: function(array) {
      var i = array.length;

      while (i--) {
        var j = Math.floor(Math.random() * (i + 1)),
            temp = array[i];

        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },

    /**
     * Get random uppercase character
     *
     * @returns {String}
     */
    upperChar: function() {
      return utils.charFrom(Password.charsUpperCase);
    },

    /**
     * Get random lowercase character
     *
     * @returns {String}
     */
    lowerChar: function() {
      return utils.charFrom(Password.charsLowerCase);
    },

    /**
     * Get random character (upper- or lowercase)
     *
     * @returns {String}
     */
    anyChar: function() {
      return utils.charFrom(Password.charsLowerCase + Password.charsUpperCase);
    },

    /**
     * Get random special symbol
     *
     * @returns {String}
     */
    special: function() {
      return utils.charFrom(Password.specials);
    },

    /**
     * Get random char from given string
     *
     * @param {String} chars String containing set of characters
     *
     * @returns {String}
     */
    charFrom: function(chars) {
      return chars.charAt(utils.random(chars.length - 1));
    },

    /**
     * Get random number in given range
     *
     * @param {Number} max   Maximum value
     * @param {Number} [min] Minimum value, default: 0
     *
     * @returns {Number}
     */
    random: function(max, min) {
      if (typeof(min) == 'undefined') min = 0;

      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };

  Password.specials = '~@#$%^&*()_-+=';
  Password.charsLowerCase = 'abcdefghijklmnopqrstuvwxyz';
  Password.charsUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  Password.defaults = {
    length: [7, 10],
    specials: 1,
    nums: 2,
    uppers: 2,
    lowers: 3
  };

  /* Generation helpers */
  function getOptionNum(target, defaults, rest) {
    if (typeof(defaults) == 'undefined') defaults = 0;

    var val = (typeof(target) == 'undefined') ? defaults : target;

    if (val > rest) val = rest;

    return val;
  }

  function getRest(rest, quant) {
    var val = rest - quant;

    return (val < 0) ? 0 : val;
  }

  /* check helpers */
  function splitChars(str) {
    var chars    = str.split(''),
        total    = chars.length,
        uppers   = 0,
        lowers   = 0,
        nums     = 0,
        specials = 0,
        sym;

    /* jshint -W084 */
    while(sym = chars.pop()) {
    /* jshint +W084 */
      if (Password.charsLowerCase.indexOf(sym) > -1) { lowers++; }
      else if (Password.charsUpperCase.indexOf(sym) > -1) { uppers++; }
      else if (!isNaN(sym)) { nums++; }
      else specials++;
    }

    return {
      uppers:   uppers,
      lowers:   lowers,
      nums:     nums,
      specials: specials,
      total:    total
    };
  }

  function bonusScore(chars) {
    var bonus = 0;

    if (chars.lowers   > 0) bonus += 2;
    if (chars.nums     > 0) bonus += 2;
    if (chars.uppers   > 0) bonus += 3;
    if (chars.specials > 0) bonus += 5;

    bonus += (chars.specials > 3 ? 3 : chars.specials);
    bonus += (chars.nums     > 2 ? 2 : chars.nums);
    bonus += (chars.uppers   > 2 ? 2 : chars.uppers);

    return bonus;
  }

  if (typeof global.define == 'function' && global.define.amd) {
    global.define(function() {
      return Password;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Password;
  } else {
    global.Password = Password;
  }
})(this);
