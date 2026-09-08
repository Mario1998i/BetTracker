<?php
header("Access-Control-Allow-Origin: https://bettracker0.netlify.app");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

require_once __DIR__ . "/config.php";

try {
    $sql = "SELECT predictions.*, users.username 
    FROM predictions
    INNER JOIN users ON predictions.user_id = users.id
    WHERE users.role = 'tipster'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $predictions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($predictions);

} catch (PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
?>