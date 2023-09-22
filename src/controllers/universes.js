const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllUniverses: async (req, res) => {
    const result = await prisma.universe.findMany()
    res.status(200).json(result)

  },
  getOneUniverse: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.universe.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Univers introuvable" });
    }

    res.status(200).json(result);

  },
  createUniverse: async (req, res) => {
    const result = await prisma.universe.create({
      data: req.body,
    });

    res.status(201).json({ message: 'Universe succesfully created', result });

  },
  deleteOneUniverse: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.universe.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json();

  },
  updateOneUniverse: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.universe.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Universe succesfully updated', result });

  }
};

