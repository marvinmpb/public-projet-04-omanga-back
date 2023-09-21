const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = {
  createOne: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      const cryptedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await prisma.user.create({
        data: {
          ...req.body,
          password: cryptedPassword,
        }
      })

      // Gérener un token
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
      // Envoyer le token au client
      return res.json({ token });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la tentative d'inscription" });
    }
  },
  login: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })

      const valid = await bcrypt.compare(req.body.password, user.password);

      if (!user || !valid) {
        res.status(401).json({ message: 'La combinaison email/mot de passe est incorrecte' });
        return;
      }

      // Gérener un token
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
      // Envoyer le token au client
      res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Une erreur est survenue lors de la tentative de connexion" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const result = await prisma.user.findMany()
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs" });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id)
        }
      })
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur" });
    }
  },
  updateOneUser: async (req, res) => {
    try {
      const result = await prisma.user.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: req.body
      })
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'utilisateur" });
    }
  },
  deleteOneUser: async (req, res) => {
    try {
      const result = await prisma.user.delete({
        where: {
          id: parseInt(req.params.id)
        }
      })
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur" });
    }
  },
}