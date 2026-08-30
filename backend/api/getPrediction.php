<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

session_start();

$dsn = "mysql:host=localhost;dbname=bettracker";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_GET["id"];

    $sql = "SELECT * FROM predictions WHERE id = ? AND user_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id, $_SESSION["user_id"]]);

    $prediction = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($prediction);
} catch (PDOException $e) {
    echo "Errore di connessione: " . $e->getMessage();
}
?>