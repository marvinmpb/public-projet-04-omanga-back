const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { SendMailToShopOwnerOnOrder } = require('../utils/sendMail');

module.exports = {
  getAllOrders: async (req, res) => {
    const result = await prisma.order.findMany(
      {
        orderBy: [{ id: 'asc' }],
      }
    );
    res.status(200).json(result);
  },
  getOneOrder: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result);
  },
  createOrder: async (req, res) => {
    const result = await prisma.order.create({
      data: req.body,
    });

    console.log(result);
    SendMailToShopOwnerOnOrder(result);
    res.status(201).json({ message: 'Order succesfully created', result });
  },
  deleteOneOrder: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.order.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();

  },
  updateOneOrder: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.order.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Order succesfully updated', result });
  },
};
