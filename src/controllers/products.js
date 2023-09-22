const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const result = await prisma.product.findMany();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOneProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { reviews: true, orders: true },
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const result = await prisma.product.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Product succesfully created', result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOneProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.product.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOneProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.product.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json({ message: 'Product succesfully updated', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
