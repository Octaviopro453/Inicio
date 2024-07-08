<?php
header('Content-Type: application/json');

function generarClaveRandom($usuario) {
    $randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);
    return "sk-" . $usuario . "-" . $randomString . "-" . $usuario;
}

function guardarClave($clave) {
    $archivo = 'claves.json';

    // Si el archivo no existe, crearlo con un array vacío
    if (!file_exists($archivo)) {
        $clavesArray = [];
    } else {
        // Leer el contenido actual del archivo y decodificarlo
        $contenido = file_get_contents($archivo);
        $clavesArray = json_decode($contenido, true);
    }

    // Agregar la nueva clave al array
    $clavesArray[] = $clave;

    // Codificar el array de nuevo a JSON y guardar el archivo
    file_put_contents($archivo, json_encode($clavesArray, JSON_PRETTY_PRINT));
}

// Obtener el usuario de la solicitud HTTP
if (isset($_GET['user'])) {
    $usuario = $_GET['user'];
    $clave = generarClaveRandom($usuario);
    guardarClave($clave);

    echo json_encode(['clave' => $clave]);
} else {
    echo json_encode(['error' => "Debes proporcionar un valor para 'user' en la solicitud HTTP."]);
}
?>
