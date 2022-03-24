const express = require('express');

const { createUser, getAllUser } = require('../models/users');
const router = express.Router();

router.get('/', async(_req, res) => {
  const users = await getAllUser();

  return res.status(200).json(users);
})

router.post('/', async (req, res) => {
  const {firstName, lastName, email, password} = req.body
  const user = await createUser({firstName, lastName, email, password});
  
  return res.status(200).json(user);
});

module.exports = router;