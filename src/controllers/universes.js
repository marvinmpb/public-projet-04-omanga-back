const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllUniverses: async (req, res, next) => {
    try {
      const result = await prisma.universe.findMany()
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  getOneUniverse: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.universe.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createUniverse: async (req, res, next) => {
    try {
      const result = await prisma.universe.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Universe succesfully created', result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOneUniverse: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.universe.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOneUniverse: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.universe.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json({ message: 'Universe succesfully updated', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
