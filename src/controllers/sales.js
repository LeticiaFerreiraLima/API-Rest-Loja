const products = require('../database/products');
const fs = require('fs/promises');

const listProducts = async (req, res) => {
    return res.status(200).json(products);
};

const addSale = async (req, res) => {
    const {product_id, qntd} = req.body;

    const productFound = products.find((product) => {
        return product.id === Number(product_id);
    });

    if(!productFound) {
        return res.status(404).json({message: 'Product not found'})
    }; 

    try {
        const sales = await fs.readFile('./src/sales.json');
        const parseSale = JSON.parse(sales);
        console.log(parseSale)

        parseSale.sales.push({
            product: productFound,
            qntd
        });

        await fs.writeFile('./src/sales.json', JSON.stringify(parseSale));
        return res.status(201).json('Sale successfully registered');

    } catch(error) {
        return res.status(500).json('Server error');
    }



};

module.exports = {
    listProducts,
    addSale
}