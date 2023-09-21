const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUniverses = async (req, res, next) => {
  try {
    const result = await prisma.universe.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneUniverse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.universe.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUniverse = async (req, res, next) => {
  try {
    const result = await prisma.universe.create({
      data: req.body,
    });
    res.status(201).json({ message: 'Universe succesfully created', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUniverse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.universe.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Universe succesfully deleted', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUniverse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.universe.update({
      where: { id: parseInt(id) },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: 'Universe succesfully updated', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
