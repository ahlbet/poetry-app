/* global $, api, store */
'use strict';

const poetry = (function () {

  function render() {

    const searchHtml = store.currentResults.map(item => {
      return generateSearchedPoemList(item, store.currentResults.indexOf(item));
    });

    $('.js-search-output').html(searchHtml);

    const savedPoemsList = generateSavedPoemList(store.poems);
    $('.js-saved-poems').html(savedPoemsList);
  }

  function generateSearchedPoemList(item, index) {

    const lines = generateLines(item);
    let isShowingPoem = 'hidden';
    let togglePoemText = 'Read poem';
    if (item.isShowingPoem) {
      isShowingPoem = '';
      togglePoemText = 'Hide poem';
    }

    return `<li data-id="${index}" class="js-searched-poem-item" >
              <strong>${item.title}</strong>
              by ${item.author}
              <button class="js-toggle-read-poem">${togglePoemText}</button>
              <button class="js-add-author">Add Poem</button>
              <div class="js-poem-lines ${isShowingPoem}">${lines}</div>
            </li>`;

  }

  function generateSavedPoemList(list) {
    const listItems = list.map(item => {
      return `<li data-id="${item.id}" class="js-saved-poem-item">
                <strong>${item.title}</strong>
                by ${item.author}
              </li>`;
    });

    return listItems.join('');
  }

  function getPoemIdFromElement(item) {
    const id = $(item).closest('.js-searched-poem-item').data('id');
    return id;
  }

  function handleToggleViewPoem() {

    $('.js-search-output').on('click', '.js-toggle-read-poem', event => {
      const id = getPoemIdFromElement($(event.currentTarget).parent());
      store.toggleViewPoem(id);
      render();
    });

  }

  function generateLines(item) {

    const lines = item.lines.map(line => {
      return `<p>${line}</p>`;
    });

    return lines.join('');

  }

  function handleSearchEvent() {
    $('.js-search-poem-form').on('submit', event => {
      event.preventDefault();
      const title = $(event.currentTarget).find('#js-search-title').val();
      $(event.currentTarget).find('#js-search-title').val('');
      const author = $(event.currentTarget).find('#js-search-author').val();
      $(event.currentTarget).find('#js-search-author').val('');
      const words = $(event.currentTarget).find('#js-search-words').val();
      $(event.currentTarget).find('#js-search-words').val('');

      store.currentQuery = { title, author, words };

      api.search(store.currentQuery)
        .then(response => {
          store.currentResults = response;
          render();
        });

    });
  }

  function handleAddPoemEvent() {
    $('.js-search-output').on('click', '.js-add-author', event => {

      event.preventDefault();
      const poemItem = $(event.currentTarget).parent();
      const id = getPoemIdFromElement(poemItem);
      const poemObj = store.currentResults[id];

      api.create('/api/poems', poemObj)
        .then(response => {
          store.poems.push(response);
          render();
        });

    });
  }

  function bindEventListeners() {
    handleSearchEvent();
    handleAddPoemEvent();
    handleToggleViewPoem();
  }

  return {
    render,
    bindEventListeners
  };

}());