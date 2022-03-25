const express = require('express');
const router = express.Router();

const {
  isRequiredFirstName,
  isRequiredLastName,
  isRequiredEmail,
  isRequiredPassword,
  userNotFould,
} = require('../middlewares/isValidUser');

const { 
  createUser,
  getAllUser,
  getUserById,
  updateUser,
} = require('../models/users');

router.get('/', async(_req, res) => {
  const users = await getAllUser();
  if (!users) return res.status(200).json([]);
  return res.status(200).json(users);
});

router.get('/:id',
userNotFould,
async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);

  return res.status(200).json(user);
})

router.post('/',
isRequiredFirstName,
isRequiredLastName,
isRequiredEmail,
isRequiredPassword,
async (req, res) => {
  const {firstName, lastName, email, password} = req.body
  const user = await createUser({firstName, lastName, email, password});
  
  return res.status(201).json(user);
});

router.put('/:id',
isRequiredFirstName,
isRequiredLastName,
isRequiredEmail,
isRequiredPassword,
userNotFould,
async (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  const {id} = req.params;
  const objUser = {firstName, lastName, email, password};
  const upUser = await updateUser(id, objUser)

  return res.status(200).json(upUser);
}
)


module.exports = router;