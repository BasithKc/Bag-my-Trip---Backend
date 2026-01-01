const bcrypt = require('bcryptjs')

async function comparePassword(hashedPassword, password) {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  comparePassword
}
