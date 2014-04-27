describe('Password.generate()', function() {
  'use strict';

  var expect   = require('chai').expect,
      Password = require('../password');

  it('generates random strings', function() {
    var i = 100;

    while(i--) { // Dummy check, i know
      var first  = Password.generate(),
          second = Password.generate();

      expect(first).to.not.eql(second);
    }
  });

  it('limits password length', function() {
    var pass = Password.generate(10);

    expect(pass.length).to.be.eql(10);
  });

  it('limits password length with range', function() {
    var i = 5;

    while(i--) {
      var pass = Password.generate([8, 12]);

      expect(pass.length).to.be.within(8, 12);
    }
  });

  it('sets number of special chars', function() {
    var reg = /[\~\@\#\$\%\^\&\*\(\)\_\-\+\=]/g;

    ([2, 4, 7, 9]).forEach(function(num) {
      var pass  = Password.generate(16, { specials: num }),
          match = pass.match(reg);

      expect(match).to.have.length(num);
    });
  });
});
