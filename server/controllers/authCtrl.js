const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db')

    try{
      let [existingUser] = await db.auth.check_for_user({ email })

      if(existingUser) {
        res.status(400).send('email already exists')
        return;
      }

      

      const salt = bcrypt.genSaltSync(5)
      const hash = bcrypt.hashSync(password, salt);

      let [newUser] = await db.auth.register_user({ email, hash })

      if(newUser){
        delete newUser.hash;
        const wishlist = await db.wishlist.create_wishlist({ user_id: newUser.user_id })
        
        req.session.user = { ...newUser, wishlist };
        res.status(201).send(newUser)
        return;
      }
      
    } catch(err){
      console.log(err)
      res.sendStatus(500);
      return;
    }

  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { email, password } = req.body
    const { user_id } = req.session

    let [ existingUser ] = await db.auth.check_for_user({ email });

    if (!existingUser){
      res.status(400).send('User does not exist, please create an account')
      return;
    }

    const authenticated = bcrypt.compareSync(password, existingUser.hash)

    if(authenticated){
      let wishlist = await db.wishlist.get_wishlist({user_id})
      delete existingUser.hash;
      req.session.user = {...existingUser, wishlist };
      res.status(200).send(req.session.user)
      return;
    }

    res.status(400).send('incorrect email or password')
    return;
  },
  logout: async (req, res) => {
    if(req.session.user){
      req.session.destroy()
    }
    res.sendStatus(200)
  },
  delete: async (req, res) => {
    const db = req.app.get('db')
    const { password } = req.body

    if(req.session.user){
      const {email, user_id } = req.session.user;
      console.log(req.session.user)

      try{
        let [ existingUser ] = await db.auth.check_for_user({ email })

        if(!existingUser){
          res.status(404).send('Account not found')
          return;
        }
        
        const authenticated = bcrypt.compareSync(password, existingUser.hash);

        if(authenticated){
          await db.auth.delete_user({ user_id })
          res.sendStatus(200)
        }
        res.status(400).send('Incorrect Password')
        return;
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
    }
    res.status(400).send('You must be logged in to delete an account. Please log in')
  }
}