const express = require("express")
const cors = require("cors")
const connection = require("./db_config")
const app = express()

app.use(cors())
app.use(express.json())

const port = 3006

// HELLO WORLD
app.get('/', (req, res) => {
    console.log("Hello World");
});

// LOGIN
app.post('/usuarios/login', (req, res) => {
    let params = Array(
        req.body.nome,
        req.body.senha
    );
    const query = "SELECT * FROM usuarios WHERE nome = ? AND senha = ?;"
    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            res.status(200).json({success: true,message: "Sucesso",data: results[0]})
        } else {
                res
                .status(400)
                .json({
                    success: false,
                    message: "Nome ou senha incorretos",
                })
        }
    })
})

// ADICIONAR CARROS
app.post('/adicionar', (req, res) => {
    const {dono, marca, modelo, placa, entrada} = req.body
    
    let query = "INSERT INTO carros(dono, marca, modelo, placa, entrada, saida) VALUES(?,?,?,?,?,'nulo');";
    connection.query(query, [dono, marca, modelo, placa, entrada], (err, results) => {
        if(results) {
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
});

//BUSCAR CARROS BANCO
app.get('/carros', (req, res) => {
    const query = 'SELECT * FROM carros WHERE saida = "nulo"'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({sucess:false, message: "Erro ao buscar produto."})
        } 
        res.json({sucess: true, carros: results})
    })
})

//EDITAR 
app.put('/carros/:id', (req, res) => {
    const params = Array(
        req.body.dono,
        req.body.marca,
        req.body.modelo,
        req.body.placa,
        req.body.entrada,
        req.params.id
    )
    const query = 'UPDATE carros SET dono = ?, marca = ?, modelo = ?, placa =?, entrada = ? WHERE id = ?;'

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
})

//SAÍDA 
app.put('/carros/saida/:id', (req, res) => {
    const params = Array(
        req.body.saida,
        req.params.id
    )
    const query = 'UPDATE carros SET saida = ? WHERE id = ?;'

    connection.query(query,params, (err, results) => {
        if(results) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            res
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
})

//DELETAR
app.delete('/carros/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM carros WHERE id=?;'

    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({sucess:false, message: "Erro ao deletar produto."})
        } 
        res.json({sucess: true, message: "Produto deletado com sucesso"})
    })
})



app.listen(port, () => console.log(`Rodando na porta ${port}`))