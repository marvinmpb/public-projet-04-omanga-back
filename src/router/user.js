// INSCRIPTION
router.post(`/signup`, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const cryptedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: cryptedPassword,
      }
    })

    // Gérener un token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
    // Envoyer le token au client
    return res.json({ token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la tentative d'inscription" });
  }
})

// CONNEXION
router.post(`/login`, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!user || !valid) {
      res.status(401).json({ message: 'La combinaison email/mot de passe est incorrecte' });
      return;
    }

    // Gérener un token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
    // Envoyer le token au client
    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la tentative de connexion" });
  }
}
)

// RECUP TOUS LES UTILISATEURS
router.get(`/user`, async (req, res) => {
  try {
    const result = await prisma.user.findMany()
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs" });
  }
})

// RECUP UN UTILISATEUR
router.get(`/user/:id`, async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur" });
  }
})

module.exports = router;