const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllFavoriteUniverses: async (req, res) => {
    const user_id = parseInt(req.params.userId);

    // Vérifier d'abord si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Récupérer les univers favoris de l'utilisateur en utilisant une jointure avec la table favoriteUniverse
    const favoriteUniverses = await prisma.favoriteUniverse.findMany({
      where: {
        user_id,
      },
      include: {
        universe: true,
      },
    });

    res.status(200).json(favoriteUniverses);
  },

  addOneFavoriteUniverse: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const universe_id = parseInt(req.params.universeId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const universe = await prisma.universe.findUnique({
      where: { id: universe_id },
    });

    if (!universe) {
      return res.status(404).json({ message: "Univers introuvable" });
    }

    // Vérifier si l'utilisateur a déjà ajouté cet univers à ses favoris
    const existingFavorite = await prisma.favoriteUniverse.findFirst({
      where: {
        user_id,
        universe_id,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Cet univers est déjà dans les favoris de l'utilisateur" });
    }

    const favorite = await prisma.favoriteUniverse.create({
      data: {
        user_id,
        universe_id,
      },
    });

    res.status(201).json(favorite);
  },


  removeOneFavoriteUniverse: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const universe_id = parseInt(req.params.universeId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const universe = await prisma.universe.findUnique({
      where: { id: universe_id },
    });

    if (!universe) {
      return res.status(404).json({ message: "Univers introuvable" });
    }

    const favorite = await prisma.favoriteUniverse.findFirst({
      where: {
        user_id,
        universe_id,
      },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Cet univers n'est pas dans les favoris de l'utilisateur" });
    }

    // Supprimer l'entrée de la table favoriteUniverse
    await prisma.favoriteUniverse.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status(204).end();
  },
};
