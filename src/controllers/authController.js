const generateToken = require('../helpers/utils').generateToken;
const User = require('../database/models').User;
const bcrypt = require('bcrypt');

module.exports = {
  signupUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      return res.status(201).json({
        message: 'User successfully created!',
        user
      })    
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to create the user!'
      });
    }
  },
  signinUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return res.status(404).json({
          error: 'User with given email not found!'
        })
      }
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid) {
        const { id, email, firstName, lastName } = user;
        const payload = {
          id,
          email,
          firstName,
          lastName
        }
        const token = generateToken(payload);
        return res.status(200).json({
          message: 'User logged in successfully',
          token
        })
      }
      return res.status(401).json({
        error: 'Wrong email or password!'
      });
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to log in the user!'
      });
    }
  }
}
