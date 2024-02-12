import jwt from 'jsonwebtoken';

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allow token to be sent via query parameter or headers
    let token = req.query.token || req.headers.authorization;

    // Extract token from "Bearer <token>" format
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
      // Verify token and extract user data
      const { data } = jwt.verify(token, secret);
      req.user = data;
      next();
    } catch (error) {
      console.error('Invalid token:', error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  },

  // Function to sign JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Function to verify JWT token
  verifyToken: function (token) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
};
