import Product from "../models/Product"

// Create product controller 
export const createProduct = async (req, res) => {
    //Traemos los parametros desde req.body
    const {name, category, price, imgURL} = req.body

    // Creamos el nuevo producto
    const newProduct = new Product({name, category, price, imgURL})

    // Guardamos el nuevo producto
    const productSaved = await newProduct.save()

    // Enviamos el status
    res.status(201).json(productSaved)
}

// Get All Products controller
export const getProducts = async(req, res) => {
    //Buscamos todos los productos en la base de datos
    const products = await Product.find()
    // Enviamos el status con la respuesta
    res.json(products)
}

// Get Product By Id
export const getProductById = async (req, res) => {
    // Buscamos el producto por ID en la base de datos
    const product = await Product.findById(req.params.productId)
    // Enviamos la respuesta con el status
    res.status(200).json(product)
}

// Update Product
export const updateProductById = async (req, res) => {
    // Buscamos el producto por el Id para actualizarlo, le solicitamos el id y los nuevos parametros a actualizar
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    //Enviamos el status con el producto actualizado
    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    // Traemos el product id
    const { productId } = req.params
    //Buscamos el producto por ID y lo eliminamos
    await Product.findByIdAndDelete(productId)
    // Enviamos el mensaje satisfactorio
    res.status(204).json()
}