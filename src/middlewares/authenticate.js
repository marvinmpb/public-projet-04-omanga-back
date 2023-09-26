module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ code: 401, message: 'no token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ code: 401, message: 'invalid token' });

    req.user = user;
    next();
  });

  app.get('/users/:id', authenticate, async (req, res) => {
    res.json(req.user);
  });
};
