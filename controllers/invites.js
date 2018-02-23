const invites = require('../models/invites.js');
const router = require('express').Router();

router.get('/', invites.allInvites, (req, res) => {
  res.json(res.locals.invites);
});

router.get('/:id', invites.findById, (req, res) => {
  res.json(res.locals.invite);
});

router.post('/', invites.addInvite, (req, res) => {
  res.json(res.locals.invite);
});

router.put('/accept/:id', invites.accept, (req, res) => {
  res.json(res.locals.invite);
});

router.put('/decline/:id', invites.decline, (req, res) => {
  res.json(res.locals.invite);
});

router.delete('/:id', invites.deleteInvite, (req, res) => {
  res.send('invite deleted');
});

module.exports = router;
