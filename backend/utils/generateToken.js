const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
module.exports = generateToken;

// const jwt = require('jsonwebtoken');

// module.exports = async function isAuthenticated(req, res, next) {
//   const token = req.headers['authorization'].split(' ')[1];

//   jwt.verify(token, 'secret', (err, user) => {
//     if (err) {
//       return res.json({ message: err });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// };
