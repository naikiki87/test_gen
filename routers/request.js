'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  console.log(req.body)
});

module.exports = router;