const connection = require('./connection');

const getAllUser = async () => {
  const [ users ] = await connection.execute('SELECT * FROM users');
  return users;
};

const getUserById = async (id) => {
  const [ user ] = await connection.execute('SELECT * FROM users WHERE id = ?',[+id]);
  if (user.length === 0) return null;
  return user;
};

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
};

const updateUser = async (id,{firstName, lastName, email, password}) => {
  const query = `UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`;
  await connection.execute(query, [firstName, lastName, email, password, id]);
  
  const upUser = {
    firstName,
    lastName,
    email,
    password,
  };

  return upUser;
};

const deleteById = async (id) => {
  await connection.execute('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteById,
};
