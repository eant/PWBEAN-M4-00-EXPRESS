/* Servidor Web hecho con Express y garra */
const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const handlebars = require("nodemailer-express-handlebars")

const server = express()

const miniThunderbird = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'brandt39@ethereal.email',
        pass: 'ZdGJfUN6XXJF6wDJzE'
    }
})

const render = {
	extName : ".hbs",
	viewPath : "template/",
	viewEngine : {
		partialsDir : "template/",
		layoutsDir : "template/",
		defaultLayout : false,
		extName : ".hbs"
	}
}

miniThunderbird.verify((error, ok) => {
/*
	if(error){
		console.log("AHHHHH")
	} else {
		console.log("Vamos M**EN!!!")
	}
*/
	let mensaje = error ? "AHHHH" : "VIVA P**ON!!"

	console.log(mensaje)
})

miniThunderbird.use("compile", handlebars(render) )

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

	let datos = req.body

	miniThunderbird.sendMail({
		from : datos.correo, //<-- Quien envia la consulta
		to : "silvio.messina@eant.tech", //<-- Quien recibe la consulta
		replyTo : datos.correo, //<-- A quien responder la consulta
		subject : datos.asunto, //<-- Asunto de la consulta
		//html : `<p>Consulta de ${datos.nombre}<br><br>${datos.mensaje}</p>` //<-- Mensaje/Consulta
		template : "bemvindo",
		context : {
			nombre : datos.nombre,
			correo : datos.correo,
			asunto : datos.asunto,
			mensaje : datos.mensaje
		}
	}, function(error, ok){

		if(!error){

			miniThunderbird.sendMail({
				from : "no-reply@supersitio.com",
				to : datos.correo,
				subject : "Gracias por su mensaje :D",
				html : "<h1>Reponderé a la brevedad</h1>"
			})

		}

	})

	res.json( req.body )
})