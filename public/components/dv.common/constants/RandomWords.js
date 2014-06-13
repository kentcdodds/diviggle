angular.module('dv.common.constants').constant('RandomWords', (function() {
  'use strict';

  var words = {
    success: [
      'Awesome!',
      'Sweet!',
      'Terrific!',
      'Cool!',
      'Great!',
      'Tada!',
      'Fantastic!'
    ],
    error: [
      'Uh oh!',
      'Whoops!',
      'Er...',
      'Hmm...',
      'Ouch!',
      'Sorry...'
    ],
    warning: [
      'Watch out!',
      'Heads up!',
      'Whoa!',
      'Hey there!',
      'Hey!'
    ],
    info: [
      'FYI,',
      'Hey,',
      'OK,'
    ]
  };

  return {
    getRandomWords: getRandomWords,
    success: getWordOfType('success'),
    error: getWordOfType('error'),
    warning: getWordOfType('warning'),
    info: getWordOfType('info')
  };

  function getWordOfType(type) {
    return function() {
      return getRandomWords(type);
    };
  }

  function getRandomWords(type) {
    return words[type][Math.floor(Math.random() * words[type].length)];
  }

})());