const express = require('express');
const fs = require('fs');
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.use(express.urlencoded({ extended: false }));

// Leer archivo JSON
const tecnicos = JSON.parse(fs.readFileSync('tecnicos.json'));

app.post('/whatsapp', (req, res) => {

    console.log(req.body);

    const mensaje = req.body.Body.toLowerCase();

    // Mensaje por defecto
    let respuesta = '👋 Bienvenido al chatbot de servicios.\n\n';
    
    respuesta += 'Servicios disponibles:\n';
    respuesta += '🔧 plomero\n';
    respuesta += '💡 electricista\n';
    respuesta += '🪚 carpintero\n\n';
    respuesta += 'Escribe uno de los servicios para ver técnicos disponibles.';

    // Si existe el servicio
    if (tecnicos[mensaje]) {

        respuesta = `👋 Bienvenido al chatbot de servicios\n\n`;

        respuesta += `Estos son los ${mensaje}s disponibles:\n\n`;

        tecnicos[mensaje].forEach((tecnico, index) => {

            respuesta += `${index + 1}. ${tecnico.nombre}\n`;
            respuesta += `📞 Tel: ${tecnico.telefono}\n\n`;

        });

    }

    const twiml = new MessagingResponse();

    twiml.message(respuesta);

    res.writeHead(200, { 'Content-Type': 'text/xml' });

    res.end(twiml.toString());

});

app.listen(3000, () => {
    console.log('Servidor funcionando en puerto 3000');
});