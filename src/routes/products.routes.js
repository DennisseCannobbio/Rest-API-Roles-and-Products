import { Router } from "express";
const router = Router()

import * as productsCtrl from '../controllers/products.controller'

// All products GET
router.get('/', productsCtrl.getProducts)

// Create Product POST
router.post('/', productsCtrl.createProduct)

// Get Product by Id GET
router.get('/:productId', productsCtrl.getProductById)

// Update product by ID
router.put('/:productId', productsCtrl.updateProductById)

// Delete product by ID
router.delete('/:productId', productsCtrl.deleteProductById)


export default router