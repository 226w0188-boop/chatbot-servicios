const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {

    console.log('Mensaje recibido');

    const mensaje = String(req.body.Body || '').toLowerCase().trim();

    let respuesta = '';

    if (mensaje === 'hola') {

        respuesta = '👋 Hola, tu chatbot funciona correctamente';

    } else {

        respuesta = 'Escribe hola';

    }

    const twiml = new MessagingResponse();

    twiml.message(respuesta);

    res.writeHead(200, { 'Content-Type': 'text/xml' });

    res.end(twiml.toString());

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor funcionando en puerto ${PORT}`);

});