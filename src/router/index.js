const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express();
const prisma = new PrismaClient()

router.use(express.json())

router.get(`/category`, async (req, res) => {
  const result = await prisma.category.findMany()
  res.json(result)
})

router.post(`/category`, async (req, res) => {
  const result = await prisma.category.create({
    data: req.body
  })
  res.json(result)
})

module.exports = router;