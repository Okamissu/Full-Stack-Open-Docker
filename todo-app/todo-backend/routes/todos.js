const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res, next) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });

    await redis.set(
      'added_todos',
      (Number(await redis.get('added_todos')) || 0) + 1,
    );

    res.send(todo);
  } catch (error) {
    next(error);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text !== undefined ? req.body.text : req.todo.text;
  req.todo.done = req.body.done !== undefined ? req.body.done : req.todo.done;

  const updatedTodo = await req.todo.save();

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
