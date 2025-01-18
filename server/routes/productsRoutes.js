const { createNewProduct, getAllProducts, getProductById, updateProduct, updateQuentityOfProduct, deleteProduct } = require('../controllers/productsControllers');

const router = require('express').Router();

//  base path = "/products"

    router.post('/', createNewProduct)
    router.get('/', getAllProducts)
    router.get('/:id', getProductById)
    router.put('/:id', updateProduct)
    router.patch('/:id', updateQuentityOfProduct)
    router.delete('/:id', deleteProduct)
    
module.exports = router;