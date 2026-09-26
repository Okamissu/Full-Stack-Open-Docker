const express = require('express');
const router = express.Router();

const configs = require('../util/config');

const redis = require('../redis/index');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get('/statistics', async (req, res) => {
  const added = await redis.get('added_todos');
  res.json({
    added_todos: added ? parseInt(added, 10) : 0,
  });
});

module.exports = router;
