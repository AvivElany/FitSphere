const { createArticle, getAllArticles, getArticleById, updateArticles, updateThingInArticle, deleteArticle } = require('../controllers/articlesControllers');

const router = require('express').Router();

  // base path = "/articles"

    router.post('/', createArticle)
    router.get('/', getAllArticles)
    router.get('/:id', getArticleById)
    router.put('/:id', updateArticles)
    router.patch('/:id', updateThingInArticle)
    router.delete('/:id', deleteArticle)
    
module.exports = router;