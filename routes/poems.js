'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const request = require('request');

const API_KEY = require('../config').API_KEY;

const Poem = require('../models/poem');

const BASE_URL = 'https://thundercomb-poetry-db-v1.p.mashape.com';

router.get('/poetry/:options/:searchQuery', (req, res, next) => {

  request({
    type: 'GET',
    url: `${BASE_URL}/${req.params.options}/${req.params.searchQuery}`,
    dataType: 'json',
    headers: {
      'X-Mashape-Key': API_KEY
    }
  }).pipe(res);

});

router.get('/poems', (req, res, next) => {

  Poem.find({})
    .then(results => {
      res.json(results);
    })
    .catch(next);

});

router.post('/poems', (req, res, next) => {

  const { title, author, lines } = req.body;
  const newPoem = { title, author, lines };

  Poem.create(newPoem)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(next);

});

module.exports = router;