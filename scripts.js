document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            // Combinar los usuarios de users.json con los registrados en localStorage
            const localUsers = JSON.parse(localStorage.getItem('users')) || [];
            const allUsers = [...users, ...localUsers];
            
            const user = allUsers.find(user => user.username === username && user.password === password);

            if (user) {
                errorMessage.textContent = ''; // Limpiar mensaje de error
                window.location.href = 'https://octaviopro453.github.io/Apis';
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos';
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo users.json:', error);
            errorMessage.textContent = 'Error al cargar datos de usuario';
        });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const registerErrorMessage = document.getElementById('register-error-message');

    // Obtener los usuarios de localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === newUsername);

    if (userExists) {
        registerErrorMessage.textContent = 'El usuario ya existe';
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso');
        registerErrorMessage.textContent = '';
        switchToLogin();
        window.location.href = 'https://octaviopro453.github.io/Apis';
    }
});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    switchToRegister();
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    switchToLogin();
});

function switchToRegister() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

function switchToLogin() {
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.register-container').style.display = 'none';
}
