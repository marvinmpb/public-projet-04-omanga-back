const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const result = await prisma.category.findMany()
      res.json(result)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  getOneCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const result = await prisma.category.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Category succesfully created', result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOneCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.category.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOneCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.category.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json({ message: 'Category succesfully updated', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
