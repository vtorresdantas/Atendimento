const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

//mongoose.connect('mongodb+srv://api_atendimento_cliente:93eQiB6wxZzvBniG@cluster0.ziiwzun.mongodb.net/api-atendimento-cliente?retryWrites=true&w=majority')
mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')

app.use(express.urlencoded({
    extended: true
}))

//registro da model
require('./models/Atendente')

require('./models/RegistroAtendimento')

require('./models/Ticket')

//rotas
const ticketRouter = require('./routers/Ticket-route')
const registroRouter = require('./routers/Registro-Atendimento-route')
const atendenteRouter = require('./routers/Atendente-route')
const index = require('./routers/index')

app.use('/', index)
app.use('/ticket', ticketRouter)
app.use('/registro', registroRouter)
app.use('/atendente', atendenteRouter)

module.exports = app;