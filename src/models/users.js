const connection = require('./connection');

const getAllUser = async () => {
  const [ users ] = await connection.execute('SELECT * FROM users');
  return users;
}

const getUserById = async (id) => {
  const [ user ] = await connection.execute('SELECT * FROM users WHERE id = ?',[+id]);
  if (user.length === 0) return null;
  return user;
}

const createUser = async ({firstName, lastName, email, password}) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO users (firstName, lastName, email, password)
  VALUES (?, ?, ?, ?)`,[firstName, lastName, email, password]);

  const user = {
    id: insertId,
    firstName,
    lastName,
    email,
    password,
  };

  return user;
}

module.exports = {
  getAllUser,
  createUser,
  getUserById,
};
