const users = require('../models/user.js');
const router = require('express').Router();

// router.get('/:id', users.findById, (req, res) => {
//   res.json(res.locals.user);
// });

// router.get('/', users.allUsers, (req, res) => {
//   res.json(res.locals.user);
// });

router.post('/', users.create, (req, res) => {
  res.json({token: res.locals.token, user: res.locals.user})
});

router.post('/login', users.login, (req, res) => {
  if (!res.locals.user) {
    res.status(401).json({err: 'Login Failed'})
  } else {
    const { password_digest, ...user } = res.locals.user;
    console.log('res.locals.user', res.locals.user);
    res.json({token: res.locals.token, user: res.locals.user});
  }
});

router.get('/:id', users.findById, (req, res) => {
  res.json(res.locals.user);
});

router.put('/:id', users.editUser, (req, res) => {
  res.json(res.locals.user);
});

router.delete('/:id', users.deleteUser, (req, res) => {
  res.send('user deleted');
});

module.exports = router;