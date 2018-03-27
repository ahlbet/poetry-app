/* global $, api, poetry, store*/
'use strict';

$(document).ready(function () {

  poetry.bindEventListeners();

  api.searchSaved('/api/poems')
    .then(results => {
      store.poems = results;
      poetry.render();
    });

});