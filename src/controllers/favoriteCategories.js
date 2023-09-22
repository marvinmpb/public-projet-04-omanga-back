const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllFavoriteCategories: async (req, res) => {
    try {
      const user_id = parseInt(req.params.userId);

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const favoriteCategories = await prisma.favoriteCategory.findMany({
        where: {
          user_id,
        },
        include: {
          category: true,
        },
      });

      res.status(200).json(favoriteCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération des catégories favorites" });
    }
  },

  addOneFavoriteCategory: async (req, res) => {
    try {
      const user_id = parseInt(req.params.userId);
      const category_id = parseInt(req.params.categoryId);

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const category = await prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!category) {
        return res.status(404).json({ message: "Catégorie introuvable" });
      }

      const existingFavorite = await prisma.favoriteCategory.findFirst({
        where: {
          user_id,
          category_id,
        },
      });

      if (existingFavorite) {
        return res.status(400).json({ message: "Cette catégorie est déjà dans les favoris de l'utilisateur" });
      }

      const favorite = await prisma.favoriteCategory.create({
        data: {
          user_id,
          category_id,
        },
      });

      res.status(201).json(favorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la catégorie aux favoris" });
    }
  },


  removeOneFavoriteCategory: async (req, res) => {
    try {
      const user_id = parseInt(req.params.userId);
      const category_id = parseInt(req.params.categoryId);

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const category = await prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!category) {
        return res.status(404).json({ message: "Catégorie introuvable" });
      }

      const favorite = await prisma.favoriteCategory.findFirst({
        where: {
          user_id,
          category_id,
        },
      });

      if (!favorite) {
        return res.status(404).json({ message: "Cette catégorie n'est pas dans les favoris de l'utilisateur" });
      }

      await prisma.favoriteCategory.delete({
        where: {
          id: favorite.id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la catégorie des favoris" });
    }
  },
}
