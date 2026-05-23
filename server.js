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

    let respuesta = 'No encontré ese servicio.';

    if (tecnicos[mensaje]) {
        respuesta = tecnicos[mensaje];
    }

    const twiml = new MessagingResponse();

    twiml.message(respuesta);

    res.writeHead(200, { 'Content-Type': 'text/xml' });

    res.end(twiml.toString());

});

app.listen(3000, () => {
    console.log('Servidor funcionando en puerto 3000');
});