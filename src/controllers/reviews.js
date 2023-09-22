const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllReviewsByProduct: async (req, res, next) => {
    try {
      const product_id = parseInt(req.params.productId);

      const reviews = await prisma.review.findMany({
        where: { product_id },
      });

      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération des reviews" });
    }
  },

  getOneReview: async (req, res, next) => {
    try {
      const review_id = parseInt(req.params.reviewId);

      const review = await prisma.review.findUnique({
        where: { id: review_id },
      });

      if (!review) {
        return res.status(404).json({ message: "Review introuvable" });
      }

      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la review" });
    }
  },

  addReview: async (req, res, next) => {
    try {
      const user_id = parseInt(req.params.userId);
      const product_id = parseInt(req.params.productId);
      const { rating, content } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const product = await prisma.product.findUnique({
        where: { id: product_id },
      });

      if (!product) {
        return res.status(404).json({ message: "Produit introuvable" });
      }

      const review = await prisma.review.create({
        data: {
          user_id,
          product_id,
          rating,
          content,
        },
      });

      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la review" });
    }
  },

  deleteOneReview: async (req, res, next) => {
    try {
      const user_id = parseInt(req.params.userId);
      const review_id = parseInt(req.params.reviewId);

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const review = await prisma.review.findUnique({
        where: { id: review_id },
      });

      if (!review) {
        return res.status(404).json({ message: "Review introuvable" });
      }

      if (review.user_id !== user_id) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette review" });
      }

      await prisma.review.delete({
        where: {
          id: review_id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la review" });
    }
  },

  updateOneReview: async (req, res, next) => {
    try {
      const user_id = parseInt(req.params.userId);
      const review_id = parseInt(req.params.reviewId);
      const { rating, content } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      const review = await prisma.review.findUnique({
        where: { id: review_id },
      });

      if (!review) {
        return res.status(404).json({ message: "Review introuvable" });
      }

      if (review.user_id !== user_id) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette review" });
      }

      const updatedReview = await prisma.review.update({
        where: {
          id: review_id,
        },
        data: {
          rating,
          content,
        },
      });

      res.status(200).json(updatedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la review" });
    }
  },
};
