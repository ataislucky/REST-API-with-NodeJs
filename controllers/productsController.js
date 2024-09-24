const crypto = require('crypto')

const products = [
    {
        "id": "36fb4978-d65b-4120-8ad0-d261f7de6b92",
        "name": "Laptop",
        "price": 400,
        "quantity": 4,
        "active": true
      },
      {
        "id": "36fb4978-d65b-4120-8ad0-d261f7de6b93",
        "name": "Keyboard",
        "price": 29.99,
        "quantity": 10,
        "active": true
      },
      {
        "id": "36fb4978-d65b-4120-8ad0-d261f7de6b94",
        "name": "Computer",
        "price": 700,
        "quantity": 5,
        "active": true
      }
]

// router.get('/', (request, response) => {
//     response.send('Hai, this is testing...')    
// })

exports.getAllProducts = (request,response) => {
    response.status(200).json(products)
}

exports.createProduct = (request, response) => {
    const { name, price, quantity, active } = request.body 

    if (!name) {
        return response.status(422).json({message: 'Name is required'})
    }

    const id = crypto.randomUUID()

    products.push({
        id,
        name,
        price,
        quantity,
        active
    })
    
    response.status(201).json({message:'Product created successfully', id})
}

exports.getProductById = (request,response) => {
    // console.log(request.params);
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        // return response.status(204).send()
        return response.status(404).json({message: 'Product not found'})
    }
    
    response.status(200).json(product)
}

exports.updateProduct = (request,response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        return response.status(404).json({message: 'Product not found'})
    }
    const { name, price, quantity, active } = request.body

    if (name) {
        product.name = name
    }if (price) {
        product.price = price
    }if (quantity) {
        product.quantity = quantity
    }if ('active' in request.body) {
        product.active = active
    }

    response.status(200).json({message: 'Product updated successfully'})
}

exports.deleteProduct = (request,response) => {
    const productIndex = products.findIndex(product => product.id == request.params.id)

    if (productIndex == -1) {
        return response.status(404).json({message: 'Product not found'}) 
    }

    products.splice(productIndex, 1)

    response.status(200).json({message: "Product deleted successfully"})
    
}