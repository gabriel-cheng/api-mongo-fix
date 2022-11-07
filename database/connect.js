const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

function mongoConnect() {
    mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.wvthnwq.mongodb.net/?retryWrites=true&w=majority`
    )
        .then(() => {
            app.listen(3000, () => {
                console.log('Banco de dados conectado com sucesso! Rodando na porta 3000');
            });
        })
        .catch((err) => {
            console.log({dbConnectErr: err});
        });
}

module.exports = mongoConnect;
