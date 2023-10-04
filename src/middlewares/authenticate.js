const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('Un-Authorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log(payload.id, req)

    // check if the user is the one trying to access the resource
    if (payload.id !== parseInt(req.params.id)) {
      res.status(403).json({ error: 'Forbidden' });
      throw new Error('Forbidden');
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
