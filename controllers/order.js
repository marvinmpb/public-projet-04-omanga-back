const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOrders = async (req, res, next) => {
  try {
    const result = await prisma.order.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const result = await prisma.order.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const result = await prisma.order.create({
      data: req.body,
    });
    res.status(200).json({ message: 'Order successfuly created', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await prisma.order.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Order successfuly deleted', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({ message: 'Order successfuly updated', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
