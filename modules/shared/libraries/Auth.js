const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Auth {
  constructor() {
    this.token = null;
  }

  /**
     * @param {string} token
     */
  setToken(token) {
    console.log('set token', token);
    this.token = token;
  }

  getToken() {
    console.log(`get token ${this.token}`);
    return this.token;
  }

  async generateToken(data) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 20, // 7 days
        data,
      },
      process.env.TOKEN_SECRET
    );
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Auth();

