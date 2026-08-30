<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$dsn = "mysql:host=localhost;dbname=bettracker";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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