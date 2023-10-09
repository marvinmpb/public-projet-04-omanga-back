const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' });
}

function generateRefreshToken(user, jti) {
  return jwt.sign({ id: user.id, role: user.role, jti }, process.env.JWT_REFRESH_SECRET, { expiresIn: '10h' });
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return { accessToken, refreshToken };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
