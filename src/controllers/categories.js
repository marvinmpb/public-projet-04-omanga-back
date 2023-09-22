const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllCategories: async (req, res) => {
    const result = await prisma.category.findMany()
    res.json(result)
  },

  getOneCategory: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.status(200).json(result);
  },

  createCategory: async (req, res) => {
    const result = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json({ message: 'Category succesfully created', result });
  },

  deleteOneCategory: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();
  },

  updateOneCategory: async (req, res) => {
    const id = req.params.id;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    const result = await prisma.category.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Category succesfully updated', result });
  }
}
