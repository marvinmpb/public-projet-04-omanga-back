const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('Un-Authorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // check if the user is an admin
    if (payload.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Forbidden, Admin only' });
    }

    req.payload = payload;
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401);
      throw new Error('Token expired');
    }
    res.status(401);
  }

  next();
};
