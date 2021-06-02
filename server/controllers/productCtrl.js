module.exports = {
  getProduct: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    if (!id) return res.sendStatus(400)
    let response;

    try {
        response = await db.products.get_product({id})
        if(response[0]){
          return res.json(response[0])
        }
        return res.sendStatus(404)
    } catch (error) {
        return res.sendStatus(500)
    }

    // const product = await db.products.get_product({id}).then( product => {
    //   res.status(200).send(product)
    
    // }).catch (err =>{
    //   res.status(500).send('Something went wrong with getting that product')
    // })


  },
  getAllProducts: async (req, res) =>{
    const db = req.app.get('db')
    const { product_ids, search_term } = req.query
    let products = []

    if (product_ids){
      const productIdsArray = product_ids.split(',')
      for (let i = 0; i < productIdsArray.length; i++){
        
        const [product] = await db.products.get_specific_product({productId: productIdsArray[i]})

        products.push(product)
      }      
      return res.json(products)
    }

    if( search_term ){
      
      const searchProducts = await db.products.get_products_by_name({search_term})
      products = searchProducts
      
      return res.json(products)
    }

    products = await db.products.get_all_products()

    res.status(200).send(products)
  },
  
  

}