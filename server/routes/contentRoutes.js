const { createNewContent, getAllContents, getContentByKey, updateContents, updateThingInContent, deleteContent } = require('../controllers/contentControllers');

const router = require('express').Router();

    //  base path = "/content"

    router.post('/' , createNewContent)
    router.get('/', getAllContents)
    router.get('/:key', getContentByKey)
    router.put('/:key', updateContents)
    router.patch('/:key', updateThingInContent)
    router.delete('/:key', deleteContent)

module.exports = router;