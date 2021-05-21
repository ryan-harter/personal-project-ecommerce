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

    const products = await db.products.get_all_products()

    res.status(200).send(products)
  },
  searchProducts: async (req, res) =>{
    const db = req.app.get('db')
    
    
  }
  

}