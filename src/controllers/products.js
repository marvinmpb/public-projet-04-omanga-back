const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllProducts: async (req, res) => {
    const result = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        universe: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(result);
  },
  getOneProduct: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { reviews: true, orders: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.status(200).json(result);
  },
  createProduct: async (req, res) => {
    const result = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json({ message: 'Product succesfully created', result });
  },
  deleteOneProduct: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();
  },
  updateOneProduct: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json({ message: 'Product succesfully updated', result });
  },
};
