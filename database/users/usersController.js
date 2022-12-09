const express = require('express');
const router = express.Router();
const User = require('./Users')
const bcrypt = require('bcryptjs')

// endereço para criar novo usuário

router.post('/user',(req, res)=>{
    const {name, email, password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    if (!name || !email || !password){
        res.sendStatus(400)
    }else if (password < 8 ){
        res.sendStatus(400)
    }else{
        User.create({
            name:name,
            email,
            password:hash
        }).then(()=> res.sendStatus(200)).catch(err=> console.log(err))
    }
})


router.post('/auth',(req,res)=>{

})

module.exports = router;
