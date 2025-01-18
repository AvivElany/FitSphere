const { createNewFact, getAllFacts, getFactById, updateFact, deleteFact } = require('../controllers/factsControllers');

const router = require('express').Router();

//  base path = "/facts"

    router.post('/', createNewFact)
    router.get('/', getAllFacts)
    router.get('/:id', getFactById)
    router.put('/:id', updateFact)
    router.delete('/:id', deleteFact)
    
module.exports = router;