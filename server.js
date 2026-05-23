const express = require('express');
const fs = require('fs');
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.use(express.urlencoded({ extended: false }));

// Leer JSON
const tecnicos = JSON.parse(fs.readFileSync('tecnicos.json'));

app.post('/whatsapp', (req, res) => {

    console.log('Mensaje recibido');

    const mensaje = req.body.Body.toLowerCase().trim();

    let respuesta = '';

    // MENÚ PRINCIPAL
    if (mensaje === 'hola' || mensaje === 'menu') {

        respuesta =
`👋 Bienvenido al chatbot de servicios

Escribe una opción:

🔧 plomero
💡 electricista
🪚 carpintero`;

    }

    // SERVICIOS
    else if (tecnicos[mensaje]) {

        respuesta = `✅ ${mensaje.toUpperCase()} DISPONIBLES:\n\n`;

        tecnicos[mensaje].forEach((tecnico, index) => {

            respuesta += `${index + 1}. ${tecnico.nombre}\n`;
            respuesta += `📞 ${tecnico.telefono}\n\n`;

        });

    }

    // NO ENCONTRADO
    else {

        respuesta =
`❌ No encontré ese servicio.

Prueba escribiendo:

- plomero
- electricista
- carpintero`;

    }

    const twiml = new MessagingResponse();

    twiml.message(respuesta);

    res.writeHead(200, { 'Content-Type': 'text/xml' });

    res.end(twiml.toString());

});

app.listen(3000, () => {
    console.log('Servidor funcionando en puerto 3000');
});