<?php
header('Content-Type: application/json');

function traducirTexto($language, $msg) {
    // Construir la URL de la API de Google Translate
    $apiUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" . urlencode($language) . "&dt=t&q=" . urlencode($msg);

    // Realizar la solicitud HTTP
    $response = file_get_contents($apiUrl);
    if ($response === FALSE) {
        return array("error" => "Ocurrió un error al traducir el texto.");
    }

    // Decodificar la respuesta JSON
    $translation = json_decode($response);

    // Extraer la traducción del arreglo de respuesta
    $translatedText = $translation[0][0][0];

    return array("translation" => $translatedText);
}

if (isset($_GET['msg']) && isset($_GET['language'])) {
    $msg = $_GET['msg'];
    $language = $_GET['language'];

    $result = traducirTexto($language, $msg);
    echo json_encode($result);
} else {
    echo json_encode(array("error" => "Parámetros 'language' y 'msg' requeridos."));
}
?>
