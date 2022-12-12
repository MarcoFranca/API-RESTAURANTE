const express = require('express');
const router = express.Router();
const User = require('./Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../apiconfig')



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
    const {email, password} = req.body

    if (!email){
        res.status(400);
        res.json({error: "O email enviado é inválido"})
    }else {
        User.findOne({where:{
            email:email
        }}).then(user=>{
            if (!user){
                res.status(404).send({err:"O email enviado não existe na base de dados!"})
            }else {
                const valPass = bcrypt.compareSync(password,user.password)
                if (valPass){

                    jwt.sign({
                        id: user.id,
                        email:user.email
                    }, jwtConfig.JWTSecret, {expiresIn: '24h'},(err, token)=>{
                        if (err){
                            res.status(400);
                            res.json({err:"Falha interna"})
                        }else {
                            res.status(200);
                            res.json({token:token})
                        }
                    })
                }else {
                    res.status(401)
                    res.json({error:"credenciais invalidas"})
                }
            }
        })
    }

})

module.exports = router;
