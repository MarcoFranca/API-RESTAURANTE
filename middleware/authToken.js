const jwtConfig = require('../database/apiconfig')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken)
    if (!authToken){
        res.status(401);
        res.json({error: "Token inválido"})
    }else{
        const bearer = authToken.split(' ')
        const token = bearer[1];
        jwt.verify(token,jwtConfig.JWTSecret,(err, data)=>{
            if (err){
                res.status(401);
                res.json({error: "Token inválido"})
            }else{
                req.token = token;
                req.logedUser = {id: data.id, email: data.email};
                next();
            }
        })
    }
}

module.exports = auth