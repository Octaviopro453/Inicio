document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert('Inicio de sesión exitoso');
                errorMessage.textContent = ''; // Limpiar mensaje de error
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos';
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo users.json:', error);
            errorMessage.textContent = 'Error al cargar datos de usuario';
        });
});
