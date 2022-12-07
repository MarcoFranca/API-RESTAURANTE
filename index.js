const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//*********  Data Base Fictício  *********

const DB = {
    receitas:[
        {
            id:21,
            title: "Empadao",
            category: "massa",
            description: "feita com farinha de trigo e camarões"
        },
        {
            id:67,
            title: "Macarrão a carbonara",
            category: "massa",
            description: "feita com fetuccini, ovos e bacon"
        },
        {
            id:28,
            title: "bife a parmegiana",
            category: "carnes",
            description: "feita com mignon molho de tomate e queijo"
        }
    ]
}

//*********  Rotas da api  *********

//*********  Retorna todos os dados da api  *********

app.get('/receitas',(req, res)=>{
    res.statusCode = 200;
    res.json(DB.receitas);
});

app.get('/receita/:id',(req, res)=>{
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        res.sendStatus(400);
    }else {
        const receita = DB.receitas.find(receita => receita.id === id);

        if (receita){
            res.statusCode = 200;
            res.json(receita)
        }else{

            res.sendStatus(404)
        }
    }
})




app.listen(PORT,()=>{
    console.log("API rodando na porta: ", PORT)
})