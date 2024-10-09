const bcrypt = require('bcryptjs')


async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

async function comparePassword(hashedPassword, password) {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}