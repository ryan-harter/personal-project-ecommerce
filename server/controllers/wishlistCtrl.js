const { default: axios } = require("axios")

module.exports = {
  addToWishlist: async (req, res) =>{
    const db = req.app.get('db')
    const { product_id } = req.body
    
    if(req.session.user){
      const{user_id} = req.session.user
      
      const wishlistData = await db.wishlist.get_wishlist({user_id})

      try{
        
        if (wishlistData[0]){        
          const { wishlist_id } = wishlistData[0]
  
          let newItem = await db.wishlist.add_to_wishlist({product_id, wishlist_id})
          let fullWishlist = await db.wishlist.get_full_wishlist({wishlist_id})

          res.status(200).send(wishlistData.concat(newItem).map(e => {
            return e // maybe return full e which is copy of list full wishlist combined with new item, which is just product Id
          }))
        } 

      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
      
    }else{
        res.status(404).send('Please sign in to add to and view your wishlist')
        return;
      
    }
  },
  deleteFromWishlist: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    
      await db.wishlist.remove_from_wishlist({id})
      res.sendStatus(200)
      return;
    
  },
  getWishlist: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user

    let response;

    const wishlist = await db.wishlist.get_wishlist({user_id})

  
    try {
      if(wishlist[0]){
        const {wishlist_id} = wishlist[0]
        response = await db.wishlist.get_full_wishlist({wishlist_id})
        if(response[0]){
          return res.json(response)
        }  
      }
      return res.sendStatus(404)
  } catch (error) {
    console.log(error)
      return res.sendStatus(500)
  }

},


}