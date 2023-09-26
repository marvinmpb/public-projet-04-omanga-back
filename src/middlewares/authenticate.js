const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];

  // if (!token) return res.status(401).json({ code: 401, message: 'no token provided' });

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.status(401).json({ code: 401, message: 'invalid token' });

  //   req.user = user;
  //   next();
  // });
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('Un-Authorized');
  }

  next();
};
