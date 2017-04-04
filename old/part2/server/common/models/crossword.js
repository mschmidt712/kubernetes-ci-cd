'use strict';
var request = require('request');


module.exports = function(Crossword) {

  Crossword.get = function(cb) {
    Crossword.findOne(function(err, crossword) {
      request("http://monitor-scale:3001/hit/123");
      if(err) handleError(err.message, cb);
      cb(null, crossword);
    });
  }

  Crossword.put = function(words, cb) {
    if(words) {
      Crossword.findOne(function (err, crossword) {
        if (err) handleError(err.message, cb);
        for (var j = 0; j < words.length; j++) {
          var word = words[j];
          var updatedWords = [];
          for (var i = 0; i < crossword.words.length; i++) {
            var crosswordWord = crossword.words[i];
            if (crosswordWord.wordNbr === word.wordNbr) {
              crosswordWord.enteredValue = word.enteredValue;
              //crosswordWord.wordOrientation = word.wordOrientation;
            }
            updatedWords.push(crosswordWord);
          }
        }
        crossword.updateAttribute('words', updatedWords, function (err, crossword) {
          if (err) handleError(err.message, cb);
          cb(null);
        });
      });
    }
    else handleError('word array is required', cb, 400)
  }

  Crossword.clear = function(cb) {
    Crossword.findOne(function(err, crossword) {
      if(err) handleError(err.message, cb);
      var updatedWords = [];
      for (var i = 0; i < crossword.words.length; i++) {
        var crosswordWord = crossword.words[i];
        crosswordWord.enteredValue = undefined;
        updatedWords.push(crosswordWord);
      }
      crossword.updateAttribute('words', updatedWords, function(err, crossword) {
        if(err) handleError(err.message, cb);
        cb(null);
      });
    });
  }

  function handleError(msg, cb, status) {
    var error = new Error(msg);
    error.status = status | 500;
    return cb(error);
  }
};
