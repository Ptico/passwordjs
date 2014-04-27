describe('Password check', function() {
  'use strict';

  var expect   = require('chai').expect,
      Password = require('../password');

  describe('Rank 0 (very weak)', function() {
    ['mypassss', '1234567', 'HELLOW', 'Hello'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(0);
      });
    });
  });

  describe('Rank 1 (weak)', function() {
    ['1234567890', 'helloworld', 'HELLOWORL', 'Hellowor', 'H0law', 'H0lA'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(1);
      });
    });
  });

  describe('Rank 2 (normal)', function() {
    ['hellobravenewwor', 'H0lawo', 'Helloworl', 'H0laworld', 'HELLONEWWORLD'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(2);
      });
    });
  });

  describe('Rank 3 (good)', function() {
    ['hellobravenewworld', 'H0lAworldd', 'H0lAworld'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(3);
      });
    });
  });

  describe('Rank 4 (very good)', function() {
    ['HellobravenewWorld', 'H0lAworld$', 'M)f$you8Ag'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(4);
      });
    });
  });

  describe('Rank 5 (amazing)', function() {
    ['M)f$you8AgL', 'H0lAwwor1d$'].forEach(function(pass) {
      it('for ' + pass, function() {
        var rank = Password.rank(pass);

        expect(rank).to.be.eql(5);
      });
    });
  });
});
