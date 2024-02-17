const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formulario

// Función para cifrar y descifrar
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

// Ruta para la página principal
app.get('/', (req, res) =>{
    res.render('index');
});

// Ruta para manejar la solicitud de cifrado
app.post('/cipher', (req, res) => {
    const { text, shift } = req.body;
    const cipheredText = caesarCipher(text, parseInt(shift), 'encrypt');
    res.render('index', { cipheredText });
});

// Ruta para manejar la solicitud de descifrado
app.post('/decipher', (req, res) => {
    const { text, shift } = req.body;
    const decipheredText = caesarCipher(text, parseInt(shift), 'decrypt');
    res.render('index', { decipheredText });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
