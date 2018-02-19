const users = require('../models/user.js');
const router = require('express').Router();

router.get('/:id', users.findById, (req, res) => {
  res.json(res.locals.user);
});

router.get('/', users.allUsers, (req, res) => {
  res.json(res.locals.user);
});

router.post('/', users.addUser, (req, res) => {
    console.log('in user post controller');
  res.json(res.locals.user);
});

router.put('/:id', users.editUser, (req, res) => {
  res.json(res.locals.user);
});

router.delete('/:id', users.deleteUser, (req, res) => {
  res.send('user deleted');
});

module.exports = router;