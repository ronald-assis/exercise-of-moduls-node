const { getUserById } = require('../models/users');
const getError = (messager) => ({error: true, messager});

const FIRST_NAME_ERROR = getError('First name is required');
const LAST_NAME_ERROR = getError('Last name is required');
const EMAIL_ERROR = getError('Email is required');
const PASSWORD_ERROR = getError('Password is required');
const PASSWORD_LENGTH_ERROR = getError('Password must be at least 6 characters long');
const USER_NOT_FOUND = getError('User not found');

const isRequiredFirstName = (req, res, next) => {
  const {firstName} = req.body;
  if (!firstName) return res.status(404).json(FIRST_NAME_ERROR);
  
  next();
};

const isRequiredLastName = (req, res, next) => {
  const {lastName} = req.body;
  if (!lastName) return res.status(404).json(LAST_NAME_ERROR);

  next();
};

const isRequiredEmail = (req, res, next) => {
  const {email} = req.body;
  if (!email) return res.status(404).json(EMAIL_ERROR);

  next();
};

const isRequiredPassword = (req, res, next) => {
  const {password} = req.body;
  if (!password) return res.status(400).json(PASSWORD_ERROR);
  if (password.length < 6) return res.status(400).json(PASSWORD_LENGTH_ERROR);

  next();
};

const userNotFound = async (req, res, next) => {
  const {id} = req.params;
  const user = await getUserById(id);
  if (!user) return res.status(404).json(USER_NOT_FOUND);

  next();
}

module.exports = {
  isRequiredFirstName,
  isRequiredLastName,
  isRequiredEmail,
  isRequiredPassword,
  userNotFound,
};