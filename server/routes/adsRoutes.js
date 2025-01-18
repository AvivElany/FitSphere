const { createNewAds, getAllAds, getAdById, updateAd, updateThingInAd, deleteAd } = require('../controllers/adsControllers');

const router = require('express').Router();

  // base path = "/ads"

    router.post('/', createNewAds)
    router.get('/', getAllAds)
    router.get('/:id', getAdById)
    router.put('/:id', updateAd)
    router.patch('/:id', updateThingInAd)
    router.delete('/:id', deleteAd)
    
module.exports = router;