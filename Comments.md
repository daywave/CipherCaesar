// Importar Express y crear una instancia de la aplicación
const express = require('express');
const app = express();

// Configuración de la vista del motor EJS y el análisis del cuerpo de la solicitud
// 1. Configuración del motor de vista EJS
app.set('view engine', 'ejs');

// 2. Habilitar el análisis del cuerpo de la solicitud para procesar datos de formularios HTML
app.use(express.urlencoded({ extended: true }));

// Función para cifrar y descifrar el texto utilizando el cifrado César
function caesarCipher(str, shift, mode) {
    if (mode === 'decrypt') shift = (26 - shift) % 26;
    return str.split('').map(char => {
        const code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            let offset = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        return char;
    }).join('');
}

// Rutas y controladores para manejar las solicitudes HTTP
// Ruta principal para cargar la página de inicio
app.get('/', (req, res) =>{
    res.render('index');
});

// Ruta para manejar la solicitud POST para cifrar el texto
app.post('/cipher', (req, res) => {
    const { text, shift } = req.body;
    const cipheredText = caesarCipher(text, parseInt(shift), 'encrypt');
    res.render('index', { cipheredText });
});

// Ruta para manejar la solicitud POST para descifrar el texto
app.post('/decipher', (req, res) => {
    const { text, shift } = req.body;
    const decipheredText = caesarCipher(text, parseInt(shift), 'decrypt');
    res.render('index', { decipheredText });
});

// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
