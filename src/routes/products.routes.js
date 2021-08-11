import { Router } from "express";
const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import { authJwt } from '../middlewares'

// All products GET
router.get('/', productsCtrl.getProducts)

// Create Product POST
router.post('/', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], productsCtrl.createProduct)

// Get Product by Id GET
router.get('/:productId', productsCtrl.getProductById)

// Update product by ID
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], productsCtrl.updateProductById)

// Delete product by ID
router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], productsCtrl.deleteProductById)


export default router