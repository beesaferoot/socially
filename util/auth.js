const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function verifyHashedPassword({ password, hash }) {
  return await bcrypt.compare(password, hash);
}

function genTempPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
module.exports = { hashPassword, verifyHashedPassword, genTempPassword };
