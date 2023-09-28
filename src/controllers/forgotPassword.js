const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const MINUTES = 3;

module.exports = {
  forgotPassword: async (req, res) => {
    const getUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!getUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: getUser.id }, process.env.JWT_RESET_SECRET, { expiresIn: '10m' });
    console.log(getUser)

    const addResetToken = await prisma.user.update({
      where: { id: getUser.id },
      data: {
        resetPassword: token,
        resetPasswordExpires: new Date(Date.now() + MINUTES * 60000).valueOf()
      },
    });

    if (!addResetToken) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Reset token added', token });
  }
};
