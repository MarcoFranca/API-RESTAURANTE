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


//*********  Retorna a receita equivalente ao id da api  *********
app.get('/receita/:id',(req, res)=>{
    const id = parseInt(req.params.id);
    if (isNaN(req.params.id)){
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


//*********  Cadastra de dados na api  *********

app.post('/receita',(req, res)=>{
    const {title, category, description} = req.body
    if (!title || !category || !description){
        res.sendStatus(400)
    }else{
        DB.receitas.push({
            id:Math.ceil(Math.random()*1000),
            title,
            category,
            description
        });
        res.sendStatus(200)
    }
})

//*********  deleta dados na api  *********

app.delete('/receita/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    if (isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       const index = DB.receitas.findIndex(receita =>  receita.id === id)
        if (index === -1){
            res.sendStatus(404);
        }else {
            DB.receitas.splice(index,1);
            res.sendStatus(200)
        }


    }
})

//*********  atualiza os dados na api  *********

app.put('/receita/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(req.params.id)){
        res.sendStatus(400)
    }else {
        const receita = DB.receitas.find(receita => receita.id === id)
        if (!receita){
            res.sendStatus(404)
        }else {
            const {title, category, description} = req.body;
            if (title){
                receita.title = title
            }
            if (category){
                receita.category = category
            }
            if (description){
                receita.description = description
            }
            res.sendStatus(200)
        }
    }
})

app.listen(PORT,()=>{
    console.log("API rodando na porta: ", PORT)
})