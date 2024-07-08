// utils/hashPassword.js

import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt

  // Generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

