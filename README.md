# password.js

Password generation and complexity checking without headache

## Usage

### Generate password

```js
Password.generate(); // Generate password with default options ({specials: 1, nums: 2, uppers: 2, lowers: 3})
Password.generate(10); // Generate password with length 10 characters
Password.generate([8, 12]); // Generate password with length 8 to 12 characters
Password.generate(10, { specials: 3 }); // Generate password with 3 special characters and 10 characters long
Password.generate([8, 12], { specials: 3, nums: 2, uppers: 3, lowers: 2 }); // Full example
```

Example:

```js
dom('.generate-password').on('click', function() {
  var password = Password.generate(),
      input    = dom('#password');

  input.set('type', 'text'); // Show generated password
  input.set('value', password);
});
```

### Check password complexity

`Password.score()` calculates overall complexity score, where minimum value is 3 and maximum limited with Javascript string length

```js
Password.score('badpass'); //=> 9
Password.score('M)f$you8Ag'); //=> 27
```

`Password.rank()` returns subjective complexity rank from 0 to 5

```js
Password.rank('badpass'); //=> 0
Password.rank('N0tSobad'); //=> 2
Password.rank('M)f$you8Ag'); //=> 4
```

Some usage examples:

```js
dom('#password').on('keydown', function(e) {
  var password = e.target.value,
      score    = Password.score(password);

  setComplexityBar(score);
});
```

```js
var LEVELS = ['very weak', 'weak', 'normal', 'good', 'very good', 'amazing'];

dom('#password').on('keydown', function(e) {
  var password = e.target.value,
      score    = Password.rank(password);

  dom('#password-hint').set('text', LEVELS[score]);
});
```

### Utils

* `Password.Utils.shuffle(array)` - shuffle array values
* `Password.Utils.upperChar()` - get random uppercase character
* `Password.Utils.lowerChar()` - get random lowercase character
* `Password.Utils.anyChar()` - get random character (upper- or lowercase)
* `Password.Utils.special()` - get random special character
* `Password.Utils.charFrom(str)` - get random char from given string
* `Password.Utils.random(max, min)` - get random number from given range (default min: 0)
