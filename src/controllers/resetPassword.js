const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MINUTES = 3;

module.exports = {
  resetPassword: async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { resetPassword: req.params.token },
    });

    const now = new Date().valueOf();

    if (user?.resetPasswordExpires) {
      if (user.resetPasswordExpires < now) {
        return res.status(401).json({ message: 'Token expired' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const addResetToken = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashed,
          resetPassword: null,
          resetPasswordExpires: null,
        },
      });
      return res.json({ message: 'Password updated' });
    }
  }
};
