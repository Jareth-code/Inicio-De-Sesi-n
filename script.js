// Lista de palabras inapropiadas
const forbiddenWords = ['malo', 'feo', 'grosero','pendejo','idiota','pene']; // Agrega las palabras que consideres inapropiadas

document.getElementById('name-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener el valor del input
    const name = document.getElementById('name').value;

    // Verificar que el campo no esté vacío
    if (name.trim() === '') {
        alert('Por favor, ingresa un nombre.');
        return;
    }

    // Verificar si el nombre contiene palabras inapropiadas
    const lowerCaseName = name.toLowerCase(); // Convertir a minúsculas para una comparación insensible a mayúsculas
    const containsForbiddenWord = forbiddenWords.some(word => lowerCaseName.includes(word));

    if (containsForbiddenWord) {
        alert('El nombre contiene una palabra inapropiada. Por favor, ingresa otro nombre.');
        return; // No continuar si se encuentra una palabra inapropiada
    }

    // Enviar el nombre al servidor
    fetch('/submit-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }), // Enviar el nombre como JSON
    })
    .then((response) => {
        if (response.ok) {
            // Mostrar el mensaje de éxito ("Hola")
            const responseDiv = document.getElementById('response');
            responseDiv.style.display = 'block';
            responseDiv.innerText = 'Hola'; // Mostrar el mensaje 'Hola'

            // Ocultar el contenedor del formulario
            document.getElementById('container').style.display = 'none';
        } else {
            // Mostrar un mensaje de error si la respuesta no es correcta
            alert('Hubo un problema al guardar el nombre.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al enviar el formulario.');
    });
});
