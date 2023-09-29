const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const APIError = require('../errors/APIError');
const { v4: uuidv4 } = require('uuid');
const { generateTokens } = require('../utils/jwt');
const { addRefreshTokenToWhitelist } = require('../auth/auth.services');
const cloudinary = require('../utils/cloudinary');

module.exports = {
  createOne: async (req, res) => {
    if (req.body.image_url) {
      const image = await cloudinary.uploader.upload(req.body.image_url, {
        folder: 'users',
      })
      req.body.image_url = image.secure_url;
    }

    const salt = await bcrypt.genSalt(10);

    const cryptedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: cryptedPassword,
      }
    })

    // TODO: catch error and return explicit message before pri
    if (!user) {
      throw new APIError({ code: 400, message: 'Un utilisateur avec cet email existe déjà' })
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, user_id: user.id });

    res.status(201).json({ message: 'Utilisateur créé', user, accessToken, refreshToken });
  },

  login: async (req, res) => {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!user || !valid) {
      throw new APIError({ code: 401, message: 'Email ou mot de passe incorrect' })
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, user_id: existingUser.id });

    res.status(201).json({ message: 'Utilisateur connecté', user: existingUser, accessToken, refreshToken });

  },

  getAllUsers: async (req, res) => {
    const result = await prisma.user.findMany()
    res.status(200).json(result)
  },

  getOneUser: async (req, res) => {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: { orders: true, favorite_categories: true, favorite_universes: true }
    })

    if (!result) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json(result);

  },
  updateOneUser: async (req, res) => {
    if (req.body.image_url) {
      const image = await cloudinary.uploader.upload(req.body.image_url, {
        folder: 'users',
      })
      req.body.image_url = image.secure_url;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const cryptedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = cryptedPassword;
    }

    const result = await prisma.user.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: req.body
    })

    res.status(200).json({ message: 'Utilisateur mis à jour', result });
  },
  deleteOneUser: async (req, res) => {
    const result = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })

    // TODO
    // delete refresh tokens belonging to user
    // await prisma.refreshToken.deleteMany({
    //   where: {
    //     user_id: parseInt(req.params.id)
    //   }
    // })

    res.status(204).json();
  },
};
