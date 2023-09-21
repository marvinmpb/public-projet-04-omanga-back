const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllOrders: async (req, res, next) => {
    try {
      const result = await prisma.order.findMany();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOneOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.order.findUnique({
        where: { id: parseInt(id) },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createOrder: async (req, res, next) => {
    try {
      const result = await prisma.order.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Order succesfully created', result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOneOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.order.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOneOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await prisma.order.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json({ message: 'Order succesfully updated', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};