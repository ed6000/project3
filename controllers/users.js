const users = require('../models/user.js');
const router = require('express').Router();

router.get('/:id', users.findById, (req, res) => {
  res.json(res.locals.user);
});

router.post('/', users.addUser, (req, res) => {
  res.json(res.locals.user);
});

router.put('/:id', users.editUser, (req, res) => {
  res.json(res.locals.user);
});

router.delete('/:id', users.deleteUser, (req, res) => {
  res.json(res.locals.user);
});

module.exports = router;