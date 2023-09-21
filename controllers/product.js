const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProducts = async (req, res, next) => {
  try {
    const result = await prisma.product.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const result = await prisma.product.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await prisma.product.create({
      data: req.body,
    });
    res.status(200).json({ message: 'Product successfully created', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Product successfully deleted', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  const id = req.params.id;
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: 'Product successfully updated', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
