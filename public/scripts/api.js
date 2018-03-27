/* global $ */
'use strict';

const api = (function () {

  const BASE_URL = '/api/poetry';

  const search = function (query) {

    let optionsTitle = '';
    let optionsAuthor = '';
    let optionsWords = '';

    let searchTitle = '';
    let searchAuthor = '';
    let searchWords = '';

    if (query.title) {
      optionsTitle = 'title';
      searchTitle = query.title;
    }

    if (query.author) {
      optionsAuthor = 'author';
      searchAuthor = query.author;
    }

    if (query.words) {
      optionsWords = 'lines';
      searchWords = query.words;
    }

    if (query.title && query.author) {
      optionsTitle = 'title,';
      searchTitle = `${query.title};`;
    }

    if (query.author && query.words) {
      optionsAuthor = 'author,';
      searchAuthor = `${query.author};`;
    }


    const options = `${optionsTitle}${optionsAuthor}${optionsWords}`;
    const searchQuery = `${searchTitle}${searchAuthor}${searchWords}`;


    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/${options}/${searchQuery}`,
      dataType: 'json'
    });
  };

  const searchSaved = function (path, query) {
    return $.ajax({
      type: 'GET',
      url: path,
      dataType: 'json',
      data: query
    });
  };

  const create = function (path, obj) {
    return $.ajax({
      type: 'POST',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj)
    });
  };

  return {
    search,
    searchSaved,
    create
  };

}());