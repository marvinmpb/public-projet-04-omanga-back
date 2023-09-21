const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCategories = async (req, res, next) => {
  try {
    const result = await prisma.category.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json({ message: 'Category succesfully created', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Category succesfully deleted', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: 'Category succesfully updated', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
