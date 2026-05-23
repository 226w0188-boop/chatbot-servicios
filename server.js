const express = require('express');
const fs = require('fs');
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Leer archivo JSON
const tecnicos = JSON.parse(fs.readFileSync('tecnicos.json'));

app.post('/whatsapp', (req, res) => {

    console.log("Mensaje recibido");

    const mensaje = req.body.Body
        ? req.body.Body.toLowerCase().trim()
        : "";

    let respuesta = '👋 Bienvenido al chatbot de servicios.\n\n';
    
    respuesta += 'Servicios disponibles:\n';
    respuesta += '🔧 plomero\n';
    respuesta += '💡 electricista\n';
    respuesta += '🪚 carpintero\n\n';
    respuesta += 'Escribe uno de los servicios.';

    if (tecnicos[mensaje]) {

        respuesta = `👋 Bienvenido al chatbot de servicios\n\n`;

        respuesta += `Estos son los ${mensaje}s disponibles:\n\n`;

        tecnicos[mensaje].forEach((tecnico, index) => {

            respuesta += `${index + 1}. ${tecnico.nombre}\n`;
            respuesta += `📞 ${tecnico.telefono}\n\n`;

        });
    }

    const twiml = new MessagingResponse();

    twiml.message(respuesta);

    res.type('text/xml');
    res.send(twiml.toString());

});

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(3000, () => {
    console.log('Servidor funcionando en puerto 3000');
});