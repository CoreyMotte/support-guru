// set up jsonwebtoken / middleware functions
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (context) => {
  //context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer')[1];
    if (token) {
      try {
        const user = jwt.verify(token, "UNSAFE_STRING");
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be Bearer [Token]");
  }
  throw new Error('Authorization header must be provided');
};