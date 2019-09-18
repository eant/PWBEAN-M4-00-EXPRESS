/* Servidor Web hecho con Express y garra */
const express = require("express")
const bodyParser = require("body-parser")

const server = express()

const port = process.env.PORT || 2000

server.listen( port )

server.use( bodyParser.urlencoded({ extended : false }) )
server.use( bodyParser.json() )

server.get("/", function(req, res){

	//res.end("Hola desde Express :D")

	res.sendFile(__dirname + "/index.html")

})

server.get("/noticias", function(req, res){
	const noticias = [
		{ titulo : "Aprendiendo Express", autor : "SM", detalle : "En desarrollo..." },
		{ titulo : "Olvidando Simple Node.js", autor : "SM", detalle : "Hasta la vista, Node" }
	]

	res.json( noticias )
})

server.post("/enviar", function(req, res){
	
	console.log( req.body.correo )

	res.json( req.body )
})