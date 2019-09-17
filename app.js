/* Servidor Web hecho con Express y garra */
const express = require("express")

const server = express()

const port = process.env.PORT || 2000

server.listen( port )

server.get("/", function(request, response){

	response.end("Hola desde Express :D")

})