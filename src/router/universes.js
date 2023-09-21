// RECUP TOUS LES UNIVERS
router.get(`/universe`, async (req, res) => {
  try {
    const result = await prisma.universe.findMany()
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des univers" });
  }
})

// RECUP UN UNIVERS
router.get(`/universe/:id`, async (req, res) => {
  try {
    const result = await prisma.universe.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'univers" });
  }
})

// CREER UN UNIVERS
router.post(`/universe`, async (req, res) => {
  try {
    const result = await prisma.universe.create({
      data: req.body
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'univers" });
  }
})

module.exports = router;