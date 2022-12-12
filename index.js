const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require('./middleware/authToken')
const cors = require('cors')
const PORT = process.env.PORT || 8080

// DB
const Receitas = require('./database/Receitas')
const User = require('./database/users/Users')
const {where} = require("sequelize");

//Controllers
const usersController = require('./database/users/usersController.js')


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', usersController);

//*********  Rotas da api  *********

//*********  Retorna todos os dados da api  *********


app.get('/receitas',auth,(req, res)=>{
    res.statusCode = 200;
    Receitas.findAndCountAll().then(receitas => res.json({user:req.logedUser, receitas: receitas})).catch(err => console.log(err))
});


//*********  Retorna a receita equivalente ao id da api  *********

app.get('/receita/:id',auth,(req, res)=>{
    const id = parseInt(req.params.id);
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else {
        Receitas.findOne({where:{
                id:id
            }}).then(receita => {
            if (receita){
                res.statusCode = 200;
                res.json(receita)
            }else {
                res.sendStatus(404)
            }
        }).catch(err => console.log(err))
    }
})

//*********  Cadastra de dados na api  *********

app.post('/receita',auth,(req, res)=>{
    const {title, category, description} = req.body
    if (!title || !category || !description){
        res.sendStatus(400)
    }else{
        Receitas.create({
            title,
            description,
            category
        }).then(()=> res.sendStatus(200)).catch(err => console.log(err));
    }
})

//*********  deleta dados na api  *********

app.delete('/receita/:id',auth,(req, res)=>{
    const id = parseInt(req.params.id)
    if (isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        Receitas.destroy({where:{
            id:id
            }}).then(receita => {
                if (receita){
                res.sendStatus(200)
                }
                else {
                    res.sendStatus(404)
                }
        })
    }
})

//*********  atualiza os dados na api  *********

app.put('/receita/:id', auth,(req, res) => {
    const title = req.body.title
    const category = req.body.category
    const description = req.body.description

    const id = parseInt(req.params.id)
    if (isNaN(req.params.id)){
        res.sendStatus(400)
    }else {
        Receitas.update({title:title, category:category, description:description},{where:{
            id:id
            }}).then(resp =>{
                if (resp > 0){
                    res.sendStatus(200)
                }else {
                    res.sendStatus(404)
                }
        })
    }})

app.listen(PORT,()=>{
    console.log("API rodando na porta: ", PORT)
})