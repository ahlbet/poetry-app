'use strict';

const store = (function () {

  const toggleViewPoem = function (id) {
    const poem = this.currentResults.find(poem => this.currentResults.indexOf(poem) === id);
    poem.isShowingPoem = !poem.isShowingPoem;
  };

  return {

    poems: [],
    phrases: [],

    currentResults: [],
    currentQuery: {
      title: '',
      author: '',
      words: ''
    },

    toggleViewPoem

  };

}());